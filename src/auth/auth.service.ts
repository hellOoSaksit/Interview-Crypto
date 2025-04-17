import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService : JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const resultLogin = await this.prisma.user.findUnique({ where: { email: email } });
        if (resultLogin && resultLogin.password === pass) {
          const { password, ...Saferesult } = resultLogin;
          return Saferesult;
        }
        return null;
      }

      async login(member) {
        const payload = { Email : member.email ,  wallet : member.wallet_id , username : member.username};
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
