import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, StepVerify } from './schema/account.schema';
import mongoose from 'mongoose';
import { AccountDto } from './dto/account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel(Account.name)
        private accountSchema: mongoose.Model<Account>
    ) { }

    async findByEmail(email: string): Promise<Account> {
        return this.accountSchema.findOne({ email })
    }

    async updateAccount(id: string, account: AccountDto): Promise<Account> {
        return await this.accountSchema.findByIdAndUpdate(id, account, { new: true })
    }

    async createAccount(email: string, verify: StepVerify): Promise<Account> {
        const account = new Account()
        account.email = email
        account.verify = verify
        return await this.accountSchema.create(account)
    }

    async updateBasisInformationByID(id: string, account: AccountDto): Promise<Account> {
        try {
            const res = await this.accountSchema.findByIdAndUpdate(id, account, {
                new: true,
                runValidators: true,
            })
            return res
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }

    async updatePasswordAndAdminByID(id: string, password: string, verify: string): Promise<Account> {
        try {
            const salt: number = 10
            const hash = await bcrypt.hash(password, salt)
            const res = await this.accountSchema.findByIdAndUpdate(id, { password: hash, verify, admin: false }, {
                new: true,
                runValidators: true,
            })
            return res
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
