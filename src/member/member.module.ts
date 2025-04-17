import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopUpService } from './topup.service';
import { TradeSellerService } from './tradeSeller.service';
import { TradeBuyingService } from './tradeBuying.service';
import { ExchangeService } from './exchange.service';
import { TransactionService } from './transaction.service';

@Module({
  imports : [AuthModule , PrismaModule],
  controllers: [MemberController],
  providers: [MemberService , TopUpService , TradeSellerService , TradeBuyingService , ExchangeService , TransactionService],
})
export class MemberModule {}
