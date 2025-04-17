import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register-dto";
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from "argon2";
import { Prisma } from "@prisma/client";

@Injectable()
export class RegisterService {
    constructor(
        private readonly prisma : PrismaService,
    ){}

    async Register(dto: RegisterDto){
        try {
            let exists ;

            exists = await this.prisma.user.findUnique({
                where : {email : dto.email}
            })
            if(exists)
            {
                return {
                    status: 'FAILED',
                    statusCode: HttpStatus.CONFLICT,
                    message: 'อีเมลนี้มีผู้ใช้งานแล้ว',
                    data: null,
                    requestedBy: 'System'
                };
            }
            // const hashPassword = await  argon2.hash(dto.password);
            const resultRegister = await this.prisma.$transaction(async(tx) => {
                await tx.user.create({
                    data : {
                        email : dto.email,
                        password : dto.password,
                        username : dto.username
                    }
                })
                const result = await tx.user.findUnique({where : {email : dto.email}})
                return {result}
            })
            const resultWork = {
                status: "SUCCESS",
                message: "สมัครสมาชิกสำเร็จ",
                data: {
                    wallet_id :  resultRegister.result?.wallet_id,
                    email : resultRegister.result?.email,
                }
            };
            return resultWork;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error('Prisma Error:', error.code, error.meta);
                throw new HttpException('เกิดข้อผิดพลาดในการบันทึกข้อมูล', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            throw new HttpException(
                'เกิดข้อผิดพลาดในการสมัครสมาชิก', 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}