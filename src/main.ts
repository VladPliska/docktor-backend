import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors({
    origin: '*' 
  })
  console.log(process.env.APP_PORT);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
