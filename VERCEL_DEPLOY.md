# Деплой NestJS на Vercel

## Что было исправлено

1. **Создана serverless функция** в `api/index.ts` для адаптации NestJS под Vercel
2. **Обновлена конфигурация** в `vercel.json` для правильной работы с serverless
3. **Исправлен .vercelignore** для включения необходимых файлов
4. **Упрощен build скрипт** в `package.json`

## Структура для Vercel

```
api/
  index.ts          # Serverless функция для Vercel
src/
  app/
    app.module.ts   # Главный модуль NestJS
  main.ts           # Оригинальный main.ts для локального запуска
vercel.json         # Конфигурация Vercel
```

## Переменные окружения

Убедитесь, что в Vercel настроены все необходимые переменные окружения:

- `DATABASE_URL`
- `JWT_SECRET`
- `TELEGRAM_BOT_TOKEN`
- `FRONTEND_URL`
- `NODE_ENV=production`

## Деплой

1. Убедитесь, что все изменения закоммичены
2. Запустите деплой на Vercel:
   ```bash
   vercel --prod
   ```

## Проверка

После деплоя ваше API будет доступно по адресу:
- `https://your-project.vercel.app/api`

## Возможные проблемы

1. **База данных**: Убедитесь, что PostgreSQL доступна из внешних сетей
2. **CORS**: Добавьте домен Vercel в список разрешенных источников
3. **Переменные окружения**: Проверьте, что все переменные настроены в Vercel Dashboard 