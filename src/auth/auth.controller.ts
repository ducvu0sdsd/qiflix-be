import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/account/dto/account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh-token')
  create(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }
}
