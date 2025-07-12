import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app/app.module';
import express from 'express';

let app: any;

async function createNestApp() {
  if (!app) {
    const expressApp = express();
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // Включаем CORS для фронтенда
    app.enableCors({
      origin: [
        'https://hakolr-dev-frontend.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.FRONTEND_URL || 'http://localhost:3000',
      ],
      credentials: true,
    });

    // Глобальная валидация
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: process.env.NODE_ENV === 'production',
      }),
    );

    // Глобальный префикс для API
    app.setGlobalPrefix('api');

    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await createNestApp();
  const server = app.getHttpAdapter().getInstance();

  return server(req, res);
}
