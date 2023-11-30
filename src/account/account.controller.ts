import { Controller, Get, Param, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './schema/account.schema';

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
}
