import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import 'dotenv/config';

const express = require('express');

let app: any;

async function createNestApp() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const nestApp = await NestFactory.create(AppModule, adapter);

  // Включаем CORS для фронтенда
  nestApp.enableCors({
    origin: [
      'https://hakolr-dev-frontend.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL || 'http://localhost:3000',
    ],
    credentials: true,
  });

  // Глобальная валидация
  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );

  // Глобальный префикс для API
  nestApp.setGlobalPrefix('api');

  await nestApp.init();
  return expressApp;
}

export default async function handler(req: Request, res: Response) {
  if (!app) {
    app = await createNestApp();
  }

  app(req, res);
}
