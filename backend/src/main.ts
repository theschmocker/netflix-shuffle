import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {config} from 'dotenv';
config();

const origin = process.env.ENVIRONMENT === 'production'
  ? 'https://netflix-shuffle.netlify.com'
  : 'http://localhost';

  console.log(origin);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin,
  })
  await app.listen(3000);
}
bootstrap();
