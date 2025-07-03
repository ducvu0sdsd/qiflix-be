/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './schema/account.schema';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<Omit<Account, 'password'>> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createAccountDto.password,
      saltRounds,
    );

    const account = new this.accountModel({
      ...createAccountDto,
      password: hashedPassword,
    });

    const { password, ...restAccount } = await account.save();

    return restAccount;
  }

  async findById(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return account;
  }

  async update(id: string, updateDto: UpdateAccountDto): Promise<Account> {
    const updated = await this.accountModel
      .findByIdAndUpdate(id, updateDto, {
        new: true,
      })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.accountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
  }

  async verifyAccount(
    email: string,
    pass: string,
  ): Promise<Omit<Account, 'password'>> {
    const account = await this.accountModel.findOne({ email }).exec();
    if (!account) {
      throw new NotFoundException('Email not found');
    }

    const isMatch = await bcrypt.compare(pass, account.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password, ...restAccount } = account;

    return restAccount;
  }
}
