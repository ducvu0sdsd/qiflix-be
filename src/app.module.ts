import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { CommentModule } from './comment/comment.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { SubtitleModule } from './subtitle/subtitle.module';
import { WatchingModule } from './watching/watching.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MovieModule,
    CommentModule,
    AccountModule,
    WatchingModule,
    AuthModule,
    JwtModule.register({
      secret:
        process.env.SECRET_KEY ||
        process.env.REFRESH_SECRET_KEY ||
        process.env.VERIFY_SERECT_KEY,
    }),
    EmailModule,
    SubtitleModule,
  ],
})
export class AppModule {}
