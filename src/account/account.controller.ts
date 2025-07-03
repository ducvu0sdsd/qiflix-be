import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  CreateAccountDto,
  LoginDto,
  UpdateAccountDto,
} from './dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signup')
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.accountService.verifyAccount(loginDto.email, loginDto.password);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.accountService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAccountDto) {
    return this.accountService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.accountService.remove(id);
    return { message: 'Account deleted successfully' };
  }
}
