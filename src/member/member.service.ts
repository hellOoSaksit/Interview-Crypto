import { HttpStatus, Injectable } from '@nestjs/common';
import { TopUpDto } from './dto/Topup-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}


  async getOrder()
  {
    const ResultOrder = await this.prisma.order.findMany();
    console.log(ResultOrder)
    return ResultOrder;
  }

  async getWallet(wallet:string)
  {
    const ResultWallet = await this.prisma.wallet.findMany({
      where : {
        wallet_id : wallet
      }
    })

    return ResultWallet;
  }
}
