import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from 'src/account/schema/account.schema';
import { AccountService } from 'src/account/account.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { EmailService } from 'src/email/email.service';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService, JwtService, EmailService]
})
export class AuthModule { }
