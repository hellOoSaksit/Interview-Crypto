import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TradeBuyingDto } from "./dto/TradeBuying-member.dto";
import Decimal from "decimal.js";

@Injectable()
export class TradeBuyingService {
    constructor(private readonly prisma: PrismaService) { }

    async TradeBuying(wallet_id: string, dto: TradeBuyingDto) {
        try {
            if(wallet_id === dto.seller_wallet_id)
            {
                return {
                    status: "ERROR",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "ผู้ขายซื้อของตัวเองไม่ได้",
                };
            }
            // ดึงข้อมูลผู้ซื้อ
            const user = await this.prisma.user.findUnique({
                where: { wallet_id },
            });
            if (!user) {
                return {
                    status: "ERROR",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "ไม่พบผู้ใช้",
                };
            }

            // ดึงข้อมูลคำสั่งขายของผู้ขาย
            const sellerOrder = await this.prisma.order.findFirst({
                where: {
                    wallet_id : dto.seller_wallet_id,
                    from_currency : dto.currency
                },
            });
            if (!sellerOrder || sellerOrder.price === null) {
                return {
                    status: "ERROR",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `ไม่พบข้อมูลคำสั่งขายสำหรับ ${dto.currency}`,
                };
            }

            // คำนวณราคาซื้อขาย
            const pricePerCoin = new Decimal(sellerOrder.price); 
            const user_currency = new Decimal(dto.amount);      
            const All_prices = pricePerCoin.mul(user_currency); 
            
            //จำนวนเหรียญผู้ขาย
            console.log('ราคาต่อเหรียญ:', pricePerCoin.toString(), 'USD');
            console.log('จำนวนที่ต้องการซื้อ:', user_currency.toString(), 'BTC');
            console.log('ราคารวมทั้งหมด:', All_prices.toString(), 'USD');
            
            // ตรวจสอบยอดเงิน USD ของผู้ซื้อ
            if(new Decimal(user.USD).lessThan(All_prices)) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `ยอดเงินไม่พอ ยอดเงินปัจจุบัน ${user.USD} USD, ต้องการ ${All_prices.toString()} USD`,
                };
            }
            if((sellerOrder.amount).lt(user_currency))
            {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `ยอดผู้ขาย มีเหรียญไม่เพียงพบ`,
                };
            }
            const reult = await this.prisma.$transaction(async (tx) =>{
                const checkWallet = await tx.wallet.findUnique({
                    where : {wallet_id_currency_code : {
                        wallet_id : wallet_id,
                        currency_code : dto.currency
                    }}
                })
                if(checkWallet)
                {
                    await tx.wallet.update({
                        where : {wallet_id_currency_code : {
                            wallet_id : wallet_id ,
                            currency_code : dto.currency,
                        }},
                        data : {
                            amount : new Decimal(checkWallet.amount.add(user_currency))
                        }
                    })
                }else{
                    await tx.wallet.create({
                        data : {
                            wallet_id : wallet_id,
                            currency_code : dto.currency,
                            amount : user_currency
                        }
                    })
                }
                
                await tx.order_History.create({
                    data :{
                        order_id : sellerOrder.order_id,
                        from_wallet_id : sellerOrder.wallet_id,
                        to_wallet_id : wallet_id,
                        amount : user_currency,
                        price : All_prices,
                        from_currency : dto.currency,
                        order_type : "Buying"
                    }
                })

                await tx.user.update({
                    where :{wallet_id : user.wallet_id},
                    data :{
                        USD : new Decimal ((user.USD).sub(All_prices))
                    }
                })
                const subOrder = await tx.order.update({
                    where : {
                       wallet_id_from_currency :{
                            wallet_id : sellerOrder.wallet_id,
                            from_currency : dto.currency,
                       }
                    },
                    data :{
                        amount : new Decimal((sellerOrder.amount).sub(user_currency))
                    }
                })
                if((subOrder.amount).lte(0))
                {
                    await tx.order.delete({
                        where : {
                            wallet_id_from_currency:{
                                wallet_id : sellerOrder.wallet_id,
                                from_currency : dto.currency
                            }
                        }
                    })
                }

            })
            return {
                status: 'SUCCESS',
                statusCode: HttpStatus.OK,
                message: 'ทำรายการสำเร็จ',
                data: {
                    FromWallet : sellerOrder.wallet_id,
                    ToWallet : wallet_id,
                    Code : dto.currency,
                    amout : dto.amount
                }
            };


        } catch (error) {
            return {
                status: 'ERROR',
                statusCode: HttpStatus.BAD_GATEWAY,
                message: 'เกิดข้อผิดพลาดระหว่างการทำรายการ',
            };
        }
    }
}