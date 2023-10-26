import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('HoonLog')
    .setDescription('Blog Project')
    .setVersion('1.0')
    .addTag('HoonLog')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
