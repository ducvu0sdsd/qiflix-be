import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { WatchingModule } from './watching/watching.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { MovieController } from './movie/movie.controller';
import { VocabularyModule } from './vocabulary/vocabulary.module';

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
    VocabularyModule,
    AuthModule,
    AuthModule,
    VocabularyModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MovieController, {
      path: '/accounts/me',
      method: RequestMethod.GET,
    });
  }
}
