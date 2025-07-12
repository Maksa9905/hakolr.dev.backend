import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { DataSource } from 'typeorm';

async function runMigrations() {
  console.log('🔄 Запуск миграций базы данных...');

  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    // Проверяем подключение к базе данных
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('📊 Подключение к базе данных установлено');
    }

    // Запускаем миграции
    await dataSource.runMigrations();
    console.log('✅ Миграции выполнены успешно');

    await app.close();
  } catch (error) {
    console.error('❌ Ошибка при выполнении миграций:', error);
    process.exit(1);
  }
}

runMigrations();
