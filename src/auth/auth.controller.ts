import { Controller, Request, Post, Body, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { RegisterService } from './register.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterService
  ) { }

  @Post("register")
  async Register(@Body() dto: RegisterDto) {
    return await this.registerService.Register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req , @Res({passthrough : true}) res) {
    const token = await this.authService.login(req.user);
    // ส่งค่า คือเป็น Cookie
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return {
        status: 'Login Ok',
        statusCode: HttpStatus.OK
    };
  }


  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res) {
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
}
