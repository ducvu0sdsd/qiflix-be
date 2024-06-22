import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { randomVerifyCode } from '../utils';
import { JwtService } from '@nestjs/jwt';
import { EmailVerifyDto } from './dto/email.dto';
import { Account, StepVerify } from 'src/account/schema/account.schema';
import { AccountService } from 'src/account/account.service';

interface VerificationQueueInterface {
    email: string,
    verifyCode: string
}

@Injectable()
export class EmailService {

    private static VERIFICATION_QUEUE: VerificationQueueInterface[] = [];

    constructor(
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly accountService: AccountService
    ) { }

    async createVerifyCode(email: string): Promise<boolean> {
        const account = await this.accountService.findByEmail(email)
        if (account) {
            return true;
        }
        const emailExist = EmailService.VERIFICATION_QUEUE.filter(item => item.email === email)[0]
        if (!emailExist) {
            const verifyCode = randomVerifyCode()
            EmailService.VERIFICATION_QUEUE.push({ email: email, verifyCode })
            this.mailerService.sendMail({
                to: email,
                from: 'truongminh1212zs@gmail.com',
                subject: "Verify Code Qiflix",
                text: "Verify Code Qiflix",
                html: `<b>Verify Code Qiflix : ${verifyCode}</b>`
            })
        } else {
            this.mailerService.sendMail({
                to: email,
                from: 'truongminh1212zs@gmail.com',
                subject: "Verify Code Qiflix",
                text: "Verify Code Qiflix",
                html: `<b>Verify Code Qiflix : ${emailExist.verifyCode}</b>`
            })
        }
        return true;
    }

    async confirmVerifyCode(emailVerify: EmailVerifyDto): Promise<Account> {
        const email = EmailService.VERIFICATION_QUEUE.filter(item => item.email === emailVerify.email)[0]
        if (email) {
            if (emailVerify.verifyCode === email.verifyCode) {
                const account: Account = await this.accountService.createAccount(email.email, StepVerify.STEP_2)
                EmailService.VERIFICATION_QUEUE = EmailService.VERIFICATION_QUEUE.filter(item => item.email !== email.email)
                return account
            } else {
                throw new UnauthorizedException("The Verify Code Don't Match")
            }
        } else {
            throw new UnauthorizedException("Email Invalid")
        }
    }
}
