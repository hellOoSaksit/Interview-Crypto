import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TradeSellerDto } from "./dto/TradeSeller-member.dto";
import Decimal from 'decimal.js';



/*
เงือนไขการขาย
1.ผู้ใช้ ต้อง ไม่ขายเหรียญ ประเภท THB และ USD เพราะใช้ในการ ซื้อขาย
2.ทศนิยม ต้องไม่ เกิน 8 ตำแหน่ง (อันนี้ ลองอ้างอิ่งจากเว็บที่ให้มา น่าจะ 8 ตำแหน่งไม่เกินนี้)
*/

@Injectable()
export class TradeSellerService {
    constructor(private readonly prisma: PrismaService) {}

    private validateCurrency(currency: string): boolean {
        return currency !== 'THB' && currency !== 'USD';
    }

    private validateDecimalPrecision(amount: Decimal): boolean {
        return amount.dp() <= 8;
    }

    async TradeSeller(wallet_id: string, dto: TradeSellerDto) {
        try {
            if (!this.validateCurrency(dto.from_currency)) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'ไม่สามารถขายเหรียญประเภท THB และ USD ได้ ใช้สำหรับแลกเปลี่ยนเท่านั้น',
                };
            }

            const tradeAmount = new Decimal(dto.amount.toString());
            if (tradeAmount.isNaN() || tradeAmount.lte(0)) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'จำนวนเหรียญต้องเป็นตัวเลขมากกว่า 0',
                };
            }

            if (!this.validateDecimalPrecision(tradeAmount)) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'เหรียญนี้รองรับทศนิยมไม่เกิน 8 หลัก',
                };
            }

            const checkWallet = await this.prisma.wallet.findUnique({
                where: {
                    wallet_id_currency_code: {
                        wallet_id,
                        currency_code: dto.from_currency,
                    },
                }
            });

            if (!checkWallet) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'ไม่พบเหรียญในกระเป๋า',
                };
            }

            const checkWalletAmount = new Decimal(checkWallet.amount.toString());
            if (checkWalletAmount.lessThan(tradeAmount)) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'ยอดของคุณไม่พอ',
                    data: `ยอดจำนวนเหรียญปัจจุบัน ${checkWallet.amount} ${checkWallet.currency_code}`,
                };
            }

            const addWallet = await this.prisma.$transaction(async (tx) => {
                const resultSubWallet = await tx.wallet.update({
                    where: {
                        wallet_id_currency_code: {
                            wallet_id,
                            currency_code: dto.from_currency,
                        }
                    },
                    data: {
                        amount: checkWalletAmount.sub(tradeAmount),
                    }
                });

                const checkOrder = await tx.order.findUnique({
                    where: {
                        wallet_id_from_currency: {
                            wallet_id,
                            from_currency: dto.from_currency
                        }
                    }
                });

                let resultOrder;
                if (checkOrder) {
                    const total_currency = new Decimal(checkOrder.amount.toString()).add(tradeAmount);
                    resultOrder = await tx.order.update({
                        where: {
                            wallet_id_from_currency: {
                                wallet_id,
                                from_currency: dto.from_currency
                            }
                        },
                        data: {
                            amount: total_currency,
                            price: dto.price,
                        }
                    });
                    console.log(resultOrder.order_id);
                    await tx.order_History.create({
                        data: {
                            order_id: resultOrder.order_id,
                            from_wallet_id: wallet_id,
                            to_wallet_id: "00000000-0000-0000-0000-000000000000",
                            amount: tradeAmount,
                            price: dto.price,
                            from_currency: dto.from_currency,
                            order_type: "Seller"
                        }
                    });
                }
                 else {
                    resultOrder = await tx.order.create({
                        data: {
                            wallet_id: checkWallet.wallet_id,
                            order_type: dto.order_type,
                            from_currency: dto.from_currency,
                            amount: tradeAmount,
                            price: dto.price,
                        }
                    });
                    console.log(resultOrder.order_id);
                    await tx.order_History.create({
                        data: {
                            order_id: resultOrder.order_id,
                            from_wallet_id: wallet_id,
                            to_wallet_id: "00000000-0000-0000-0000-000000000000",
                            amount: tradeAmount,
                            price: dto.price,
                            from_currency: dto.from_currency,
                            order_type: "Seller"
                        }
                    });
                }

                return { resultSubWallet, resultOrder };
            });

            return {
                status: 'SUCCESS',
                statusCode: HttpStatus.OK,
                message: 'ทำรายการสำเร็จ',
                data: {
                    wallet_balance: addWallet.resultSubWallet.amount,
                    // order: addWallet.resultOrder,
                }
            };

        } catch (error) {
            console.error('TradeSeller Error:', error);
            return {
                status: 'ERROR',
                statusCode: HttpStatus.BAD_GATEWAY,
                message: 'เกิดข้อผิดพลาดระหว่างดำเนินการ',
            };
        }
    }
}
