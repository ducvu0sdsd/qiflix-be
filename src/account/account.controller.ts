import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('sign-up')
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get('me')
  async findMe(@Req() req: Request) {
    const { account_id } = req['account'];
    return this.accountService.findById(account_id);
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
