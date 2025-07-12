#!/bin/bash

# Скрипт для деплоя Hakolr Blog Backend
set -e

echo "🚀 Начинаем деплой Hakolr Blog Backend..."

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "❌ Файл .env не найден! Скопируйте .env.example в .env и настройте переменные окружения"
    exit 1
fi

# Проверяем наличие обязательных переменных
source .env
if [ -z "$JWT_SECRET" ] || [ -z "$ADMIN_LOGIN" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "❌ Не все обязательные переменные окружения настроены!"
    echo "Проверьте JWT_SECRET, ADMIN_LOGIN, ADMIN_PASSWORD в файле .env"
    exit 1
fi

# Останавливаем предыдущие контейнеры
echo "🛑 Останавливаем предыдущие контейнеры..."
docker-compose down

# Собираем новый образ
echo "🔨 Собираем новый образ..."
docker-compose build backend

# Запускаем базу данных
echo "📊 Запускаем базу данных..."
docker-compose up -d postgres

# Ждем запуска базы данных
echo "⏳ Ожидаем запуска базы данных..."
sleep 10

# Запускаем основное приложение
echo "🚀 Запускаем приложение..."
docker-compose up -d backend

# Проверяем статус
echo "🔍 Проверяем статус приложения..."
sleep 5

if docker-compose ps | grep -q "Up"; then
    echo "✅ Деплой завершен успешно!"
    echo "📚 API доступно по адресу: http://localhost:${PORT:-3001}/api"
    echo "🔐 Для получения JWT токена используйте Telegram бота"
else
    echo "❌ Что-то пошло не так! Проверьте логи:"
    docker-compose logs backend
    exit 1
fi 