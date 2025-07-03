import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
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
    AccountModule,
    WatchingModule,
    JwtModule.register({
      secret:
        process.env.SECRET_KEY ||
        process.env.REFRESH_SECRET_KEY ||
        process.env.VERIFY_SERECT_KEY,
    }),
  ],
})
export class AppModule {}
