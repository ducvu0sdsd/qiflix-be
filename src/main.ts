import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NextFunction } from 'express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());


  app.enableCors({
    origin: 'http://localhost:3000'
  });

  await app.listen(8080);
}

bootstrap();
