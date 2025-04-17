import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegisterService } from './register.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports : [PrismaModule , PassportModule , ConfigModule,
    JwtModule.registerAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: 
            { expiresIn: configService.get<string>('JWT_EXPIRESIN')

            }
        };
      }
    })],
  controllers: [AuthController],
  providers: [AuthService , RegisterService , LocalStrategy ,JwtStrategy],
  exports:[AuthModule]
})
export class AuthModule {}
