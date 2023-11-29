import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Account } from 'src/account/schema/account.schema';
import * as bcrypt from 'bcrypt';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('Account')
        private accountModel: Model<Account>,
        private accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async signin(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        try {
            const account = await this.accountService.findByEmail(email)
            if (account) {
                const isMatch = await bcrypt.compare(password, account.password)
                if (isMatch) {
                    const payload = { email: account.email, admin: account.admin }
                    const access_token: string = await this.jwtService.sign(payload, {
                        secret: process.env.SECRET_KEY,
                        expiresIn: process.env.EXPIRES_IN
                    })
                    const refresh_token: string = await this.jwtService.sign(payload, {
                        secret: process.env.REFRESH_SECRET_KEY,
                        expiresIn: process.env.REFRESH_EXPIRES_IN
                    })
                    return {
                        accessToken: access_token,
                        refreshToken: refresh_token
                    }
                } else {
                    throw new UnauthorizedException(`Password doesn't match`);
                }
            } else {
                throw new NotFoundException(`Account not found`);
            }
        } catch (error) {
            throw new BadRequestException(`Bad Request: ${error.message}`);
        }
    }
}
