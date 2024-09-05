import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './schema/account.schema';
import { AccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountController {

    constructor(
        private accountService: AccountService
    ) { }

    @Get('get-by-email/:email')
    async findByEmail(@Param('email') email: string): Promise<Account> {
        return this.accountService.findByEmail(email)
    }

    @Get('get-by-email')
    async getByEmail(@Req() req: Request): Promise<Account> {
        const decodedToken = (req as any).decodedToken;
        return this.accountService.findByEmail(decodedToken.email)
    }

    @Put(':id')
    async updateAccount(@Param('id') id: string, @Body() account: AccountDto): Promise<Account> {
        return this.accountService.updateAccount(id, account)
    }
}
