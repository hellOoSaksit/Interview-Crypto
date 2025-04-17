import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';

@Module({
  imports: [AuthModule ,PrismaModule , ConfigModule.forRoot(), MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
