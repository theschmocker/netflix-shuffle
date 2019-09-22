import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {config} from 'dotenv';
config();

const origin = process.env.ENVIRONMENT === 'production'
  ? 'https://netflix-shuffle.netlify.com'
  : [
      // cover local dev and prod builds of frontend
      'http://localhost:4200',
      'http://localhost:5000',
  ];

  console.log(origin);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin,
  })
  await app.listen(3000);
}
bootstrap();
