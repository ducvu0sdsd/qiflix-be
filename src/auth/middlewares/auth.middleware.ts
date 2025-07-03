import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const type = (req.headers as any).authorization?.split(' ')[0];
    const token = (req.headers as any).authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Not Found token');
    }

    try {
      const decodedToken = await this.jwtService.verify(token, {
        secret:
          type === 'Access'
            ? process.env.SECRET_KEY
            : process.env.REFRESH_SECRET_KEY,
      });
      const exp = decodedToken.exp * 1000;
      const currentTimestamp = new Date().getTime();
      if (currentTimestamp > exp) {
        throw new UnauthorizedException(`${type} Token has expired`);
      }
      (req as any).decodedToken = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException(`Invalid ${type} Token`);
    }
  }
}
