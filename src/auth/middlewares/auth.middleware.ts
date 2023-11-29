import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JwtService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken = (req.headers as any).authorization?.split(' ')[1]
        if (!accessToken) {
            throw new UnauthorizedException("Not Found AccessToken")
        }

        try {
            const decodedToken = this.jwtService.verify(accessToken)
            const exp = decodedToken.exp * 1000;
            const currentTimestamp = new Date().getTime()
            if (currentTimestamp > exp) {
                throw new UnauthorizedException("Access Token has expired")
            }
            next()
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid Access Token')
        }
    }
}