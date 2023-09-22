import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Set up
  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
