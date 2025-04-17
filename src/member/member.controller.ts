import { Controller, Get, Request, UseGuards , Post ,Body} from '@nestjs/common';
import { MemberService } from './member.service';
import {  TopUpDto } from './dto/Topup-member.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { TopUpService } from './topup.service';
import { TradeSellerService } from './tradeSeller.service';
import { TradeSellerDto } from './dto/TradeSeller-member.dto';
import { TradeBuyingService } from './tradeBuying.service';
import { TradeBuyingDto } from './dto/TradeBuying-member.dto';
import { ExchangeService } from './exchange.service';
import { ExchangeDto } from './dto/Exchange.dto';
import { TransactiodDto } from './dto/Transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly topupService : TopUpService,
    private readonly tradeSellerService : TradeSellerService,
    private readonly tradeBuyingService : TradeBuyingService,
    private readonly exchangeService : ExchangeService,
    private readonly transactionService : TransactionService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('topup')
  async TopUp(@Body() dto:TopUpDto , @Request() req){
    const userTopup = req.user.wallet;
    // console.log(userTopup);
    return await this.topupService.Topup(userTopup,dto);
  }


  @UseGuards(JwtAuthGuard)
  @Post('trade/sell')
  async TradeSeller(@Body() dto:TradeSellerDto , @Request() req)
  {
    const userTrade = req.user.wallet;
    return await this.tradeSellerService.TradeSeller(userTrade , dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('trade/buy')
  async TradeBuying(@Body() dto:TradeBuyingDto , @Request() req)
  {
    const userTrade = req.user.wallet;
    return await this.tradeBuyingService.TradeBuying(userTrade , dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('wallet/exchange')
  async Exchange(@Body() dto:ExchangeDto , @Request() req)
  {
    const userTrade = req.user.wallet;
    return await this.exchangeService.Exchange(userTrade , dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('wallet/transaction')
  async Transaction(@Body() dto:TransactiodDto , @Request() req) 
  {
    const userTransaction = req.user.wallet;
    return await this.transactionService.Transaction(userTransaction,dto);
  }

  @Get('order')
  async getOrder() 
  {
    return await this.memberService.getOrder();
  }

  @UseGuards(JwtAuthGuard)
  @Post('wallet/profile')
  async GetWallet(@Request() req) 
  {
    const userWallet = req.user.wallet;
    return await this.memberService.getWallet(userWallet);
  }

}
