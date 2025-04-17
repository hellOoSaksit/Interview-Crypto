import { HttpStatus, Injectable } from '@nestjs/common';
import { TopUpDto } from './dto/Topup-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopUpService {
    constructor(private readonly prisma: PrismaService) { }

    async Topup(wallet_id: string, dto: TopUpDto) {

        if (dto.currency_code !== "THB" && dto.currency_code !== "USD") {
            return {
                status: 'FAILED',
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'เติมเงินได้เฉพาะ THB และ USD เท่านั้น',
            };
        }

        const resultFindmember = await this.prisma.user.findUnique({
            where: { wallet_id },
        });

        if (!resultFindmember) {
            return {
                status: 'FAILED',
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'ไม่พบผู้ใช้ กรุณา Login',
            };
        }

        try {
            const resultFindUser = await this.prisma.user.findUnique({
                where: {
                    wallet_id: wallet_id
                },
            });

            if (!resultFindUser) {
                return {
                    status: 'ERROR',
                    statusCode: HttpStatus.CREATED,
                    message: 'ไม่พบ บัญชีผู้ใช้',
                };
            } else {
                let newBalance
                if (dto.currency_code === "THB") {
                    newBalance = resultFindUser.THB.add(dto.amount)
                    await this.prisma.user.update({
                        where: {
                            wallet_id: wallet_id
                        },
                        data: {
                            THB: newBalance
                        }
                    })
                } else {
                    newBalance = resultFindUser.USD.add(dto.amount)
                    await this.prisma.user.update({
                        where: {
                            wallet_id: wallet_id
                        },
                        data: {
                            USD: newBalance
                        }
                    })
                }


                return {
                    status: 'SUCCESS',
                    statusCode: HttpStatus.OK,
                    message: 'เติมเงินสำเร็จ',
                    data: `ยอดเงินปัจจุบัน ${newBalance}`,
                };
            }
        } catch (error) {
            return {
                status: 'FAILED',
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'ชนิดของเหรียญไม่ถูกต้องหรือมีข้อผิดพลาด',
                // error: error.message,
            };
        }
    }
}
