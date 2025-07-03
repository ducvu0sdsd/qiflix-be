import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [JwtModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtModule],
})
export class AuthModule {}
