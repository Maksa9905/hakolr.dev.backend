import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Сервер запущен на порту ${port}`);
  console.log(`📚 API доступно по адресу: http://localhost:${port}/api`);
  console.log(`🔐 JWT аутентификация с библиотекой jose активна`);
  console.log(
    `🤖 Telegram бот ${process.env.TELEGRAM_BOT_TOKEN ? 'активен' : 'неактивен'}`,
  );
}

// Для локальной разработки
if (require.main === module) {
  bootstrap().catch((error) => {
    console.error('❌ Ошибка запуска сервера:', error);
    process.exit(1);
  });
}

// Экспорт для serverless функций
export { bootstrap };
