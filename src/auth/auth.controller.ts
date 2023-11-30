import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountDto } from '../account/dto/account.dto';
import { Account } from '../account/schema/account.schema';
import { AccountDtoSignIn } from '../account/dto/accountsignin.dto';
import { AccountService } from '../account/account.service';
import { EmailService } from '../email/email.service';
import { EmailVerifyDto } from '../email/dto/email.dto';

@Controller('auths')
export class AuthController {

    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private emailService: EmailService
    ) { }

    @Post('sign-in')
    async signin(@Body() account: AccountDtoSignIn): Promise<{ accessToken: string, refreshToken: string, account: Account }> {
        return this.authService.signin(account.email, account.password)
    }

    @Get('create-verify-code/:email')
    async createVerifyCode(@Param('email') email: string): Promise<boolean> {
        return this.emailService.createVerifyCode(email)
    }

    @Post('confirm-verify-code')
    async confirmVerifyCode(@Body() emailVerify: EmailVerifyDto): Promise<Account> {
        return this.emailService.confirmVerifyCode(emailVerify)
    }

    @Put('update-basis-information-by-id/:id')
    async updateBasisInformationByID(@Param('id') id: string, @Body() account: AccountDto): Promise<Account> {
        return this.accountService.updateBasisInformationByID(id, account)
    }

    @Put('update-password-by-id/:id')
    async updatePasswordByID(@Param('id') id: string, @Body() { password, verify }: { password: string, verify: string }) {
        return this.accountService.updatePasswordAndAdminByID(id, password, verify)
    }

    @Get('check-access-token')
    async checkAccessToken(): Promise<boolean> {
        return true;
    }

    @Post('refresh-token')
    async refreshToken(@Req() req: Request): Promise<{ accessToken: string, refreshToken: string }> {
        const decodedToken = (req as any).decodedToken;
        return this.authService.refreshToken(decodedToken)
    }
}
