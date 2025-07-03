import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private accessTokenSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenSecret = this.configService.get<string>('SECRET_KEY');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.accessTokenSecret,
      });
      req['account'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
