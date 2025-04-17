import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import Decimal from "decimal.js";
import { ExchangeDto } from "./dto/Exchange.dto";

@Injectable()
export class ExchangeService {
  constructor(private readonly prisma: PrismaService) {}

  async Exchange(wallet_id: string, dto: ExchangeDto) {
    try {
      if (dto.from_currency !== "THB" || dto.to_currency !== "USD") {
        return {
          status: "ERROR",
          statusCode: HttpStatus.BAD_REQUEST,
          message: "รองรับเฉพาะการแลกจาก THB เป็น USD เท่านั้น",
        };
      }

      const user = await this.prisma.user.findUnique({
        where: { wallet_id },
      });

      if (!user) {
        return {
          status: "ERROR",
          statusCode: HttpStatus.NOT_FOUND,
          message: "ไม่พบผู้ใช้",
        };
      }

      const currentTHB = new Decimal(user.THB);
      const requestedAmount = new Decimal(dto.amount);


      //แลกเปลี่ยน บาท เช่น ใส่ 100 บาท แลกได้เท่าไร 
      if (currentTHB.lessThan(requestedAmount)) {
        return {
          status: "ERROR",
          statusCode: HttpStatus.BAD_REQUEST,
          message: "ยอดเงินใน THB ไม่เพียงพอ",
        };
      }

      const currency = await this.prisma.currency.findUnique({
        where: { currency_code: "THB" },
      });

      if (!currency || currency.price === null) {
        return {
          status: "ERROR",
          statusCode: HttpStatus.BAD_REQUEST,
          message: "ไม่พบอัตราแลกเปลี่ยน THB",
        };
      }

      
      //จำนวนที่จะแลก / 35 (มาจาก DB)
      /*
        สมการแลกเปลี่ยน x = x / rete เล่น 15 บาท แลก USD = 15 / ค่าเงินปัจจุบัน (35)
      */
      const rate = new Decimal(currency.price);
      const amountInUSD = new Decimal(requestedAmount.div(rate)); //requested หาร reate (35)
      const newTHB = new Decimal((currentTHB).minus(requestedAmount)); //<< ---- currentTHB - RequestedAmount
      const newUSD = new Decimal(user.USD).plus(amountInUSD); //<< ---- user.USD + amountUSD
      await this.prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { wallet_id },
          data: {
            THB: newTHB,
            USD: newUSD,
          },
        });
      });

      return {
        status: "SUCCESS",
        statusCode: HttpStatus.OK,
        message: `แปลง ${requestedAmount.toFixed(2)} THB เป็น ${amountInUSD.toFixed(2)} USD สำเร็จ`,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "ERROR",
        statusCode: HttpStatus.BAD_GATEWAY,
        message: "เกิดข้อผิดพลาดในการแลกเปลี่ยน",
      };
    }
  }
}
