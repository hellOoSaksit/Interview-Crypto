import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { TransactiodDto } from './dto/Transaction.dto';
import Decimal from 'decimal.js';
@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }
    async Transaction(wallet_id: string, dto: TransactiodDto) {
        try {
            if (wallet_id == undefined && dto.to_wallet_id == undefined) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'ขาดรายการโอน ชื่อผู้รับ หรือ ชื่อผู้ส่ง',
                };
            }
            const resultFrom = await this.prisma.wallet.findUnique({
                where: {
                    wallet_id_currency_code:
                    {
                        wallet_id: wallet_id,
                        currency_code: dto.currency_code
                    }
                }
            })
            const resultTo = await this.prisma.wallet.findUnique({
                where: {
                    wallet_id_currency_code:
                    {
                        wallet_id: dto.to_wallet_id,
                        currency_code: dto.currency_code
                    }
                }
            })
            if (!resultFrom) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'ไม่พบรายการเหรียญในกระเป๋าของคุณ',
                };
            }
            if ((resultFrom.amount).lt(dto.amount)) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'เหรียญในกระเป๋าคุณไม่เพียงพอ',
                };
            }

            const resultTransaction = await this.prisma.$transaction(async (tx) => {
                const resultUpdateFrom = await tx.wallet.update({
                    where: {
                        wallet_id_currency_code: {
                            wallet_id: wallet_id,
                            currency_code: dto.currency_code
                        }
                    },
                    data: {
                        amount: new Decimal((resultFrom.amount).sub(dto.amount))
                    }
                })
                if (resultTo) {
                    await tx.wallet.update({
                        where: {
                            wallet_id_currency_code: {
                                wallet_id: dto.to_wallet_id,
                                currency_code: dto.currency_code
                            }
                        },
                        data: {
                            amount: new Decimal((resultTo.amount).add(dto.amount))
                        }
                    })
                } else {
                    await tx.wallet.create({
                        data: {
                            wallet_id: dto.to_wallet_id,
                            currency_code: dto.currency_code,
                            amount: dto.amount
                        }
                    })
                }
                await tx.transaction_History.create({
                    data: {
                        from_wallet_id: wallet_id,
                        to_wallet_id: dto.to_wallet_id,
                        currency_code: dto.currency_code,
                        amount: dto.amount
                    }
                })
            })
            return {
                status: 'SUCCESS',
                statusCode: HttpStatus.OK,
                message: 'ทำรายการสำเร็จ',
                data: {
                    FromWallet : wallet_id,
                    ToWallet : dto.to_wallet_id,
                    Code : dto.currency_code,
                    amout : dto.amount
                }
            };
        } catch (error) {
            return {
                status: 'ERROR',
                statusCode: HttpStatus.BAD_GATEWAY,
                message: 'เกิดข้อผิดพลาดระหว่างดำเนินการ',
            };
        }

    }
}