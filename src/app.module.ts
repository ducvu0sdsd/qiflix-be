import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { CommentModule } from './comment/comment.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces'
import { RequestMethod } from '@nestjs/common/enums'
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { UserController } from './user/user.controller';
import { AccountController } from './account/account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      },
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MovieModule,
    CommentModule,
    AccountModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || process.env.REFRESH_SECRET_KEY || process.env.VERIFY_SERECT_KEY,
    }),
    EmailModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/auths/create-verify-code/:email')
      .exclude('/accounts/get-by-email/:email')
      .exclude('/users/update-watching/:id')
      .forRoutes(
        { path: '/auths/:email', method: RequestMethod.GET },
        { path: '/auths/check-access-token', method: RequestMethod.GET },
        { path: '/auths/refresh-token', method: RequestMethod.POST },
        UserController,
        AccountController
      )
  }
}
