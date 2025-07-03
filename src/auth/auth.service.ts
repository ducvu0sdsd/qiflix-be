/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { AuthAccountDto } from 'src/account/dto/account.dto';

@Injectable()
export class AuthService {
  private accessTokenSecret: string;
  private accessTokenExpiresIn: string;

  private refreshTokenSecret: string;
  private refreshTokenExpiresIn: string;

  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {
    this.accessTokenSecret = this.configService.get<string>('SECRET_KEY');
    this.accessTokenExpiresIn = this.configService.get<string>('EXPIRES_IN');

    this.refreshTokenSecret =
      this.configService.get<string>('REFRESH_SECRET_KEY');
    this.refreshTokenExpiresIn =
      this.configService.get<string>('REFRESH_EXPIRES_IN');
  }

  createAccessToken(payload: any): string {
    return this.jwt.sign(payload, {
      secret: this.accessTokenSecret,
      expiresIn: this.accessTokenExpiresIn,
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwt.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: this.refreshTokenExpiresIn,
    });
  }

  verify(token: string, isRefreshToken = false): any {
    const secret = isRefreshToken
      ? this.refreshTokenSecret
      : this.accessTokenSecret;

    return this.jwt.verify(token, { secret });
  }

  decode(token: string): any {
    return this.jwt.decode(token);
  }

  refreshToken(refreshToken: string): {
    accessToken: string;
    refreshToken: string;
  } {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    try {
      const { account_id } = this.verify(refreshToken, true);

      const accessToken = this.createAccessToken({ account_id });

      return { accessToken, refreshToken };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<Omit<AuthAccountDto, 'password'>> {
    const account = await this.accountService.verifyAccount(email, password);

    const accessToken = this.createAccessToken({ account_id: account._id });

    const refreshToken = this.createRefreshToken({ account_id: account._id });

    return { ...account, accessToken, refreshToken };
  }
}
