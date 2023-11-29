import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { AccountModule } from 'src/account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from 'src/account/schema/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  providers: [EmailService, JwtService, AccountService]
})
export class EmailModule { }
