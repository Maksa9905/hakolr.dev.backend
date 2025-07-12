# Деплой на Vercel

## Важно: Пошаговое тестирование

Мы создали простую тестовую версию для отладки проблем с деплоем.

### Шаг 1: Тестирование базовой функциональности

После деплоя проверьте:
- `https://your-project.vercel.app/api/health` - должен вернуть JSON со статусом
- `https://your-project.vercel.app/health` - альтернативный endpoint

**Ожидаемый ответ:**
```json
{
  "status": "ok",
  "message": "Vercel serverless function is working",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "method": "GET",
  "url": "/api/health"
}
```

### Шаг 2: Проверка сборки

Если базовая функциональность работает, endpoint будет показывать:
```json
{
  "status": "building",
  "message": "Dist directory found, but NestJS initialization is disabled for testing",
  "distFiles": ["src", "..."],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Шаг 3: Включение NestJS

После успешного тестирования мы включим полную функциональность NestJS.

## Структура проекта для Vercel

```
project/
├── api/
│   └── index.js          # Тестовая serverless функция
├── src/                  # Исходный код NestJS
├── dist/                 # Собранный код (создается при сборке)
├── vercel.json           # Конфигурация Vercel
├── .vercelignore         # Исключения для Vercel
└── package.json
```

## Подготовка к деплою

1. **Соберите проект:**
   ```bash
   npm run build
   ```

2. **Убедитесь что есть все файлы:**
   - `api/index.js` - тестовая функция
   - `vercel.json` - конфигурация
   - `.vercelignore` - исключения
   - `dist/` папка с собранным кодом

## Деплой на Vercel

### Шаг 1: Настройка проекта
1. Зайдите на [Vercel](https://vercel.com/)
2. Подключите GitHub репозиторий
3. **Важно**: Выберите "Other" как Framework preset

### Шаг 2: Настройки сборки
В разделе "Build & Output Settings":
- **Build Command**: `npm run build`
- **Output Directory**: оставьте пустым
- **Install Command**: `npm install --production=false`

### Шаг 3: Переменные окружения
Добавьте в "Environment Variables":

**Обязательные:**
```
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here
ADMIN_LOGIN=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

**Telegram бот:**
```
TELEGRAM_BOT_TOKEN=your-bot-token-from-botfather
```

**База данных:**
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Шаг 4: Деплой
1. Нажмите "Deploy"
2. Дождитесь завершения сборки
3. Получите URL (например: `https://your-project.vercel.app`)

## Отладка

### Шаг 1: Проверьте базовую функциональность
Откройте `https://your-project.vercel.app/api/health`

**Если получаете 200 OK** - функция работает ✅  
**Если получаете ошибку** - проверьте логи в Vercel Dashboard

### Шаг 2: Проверьте сборку
Если health endpoint работает, проверьте что возвращается в `distFiles` массиве.

### Шаг 3: Проверьте логи
В Vercel Dashboard:
1. Перейдите в Functions
2. Нажмите на функцию
3. Посмотрите логи для деталей ошибок

## Общие проблемы

### "This Serverless Function has crashed"
1. Проверьте что `npm run build` работает локально
2. Убедитесь что все переменные окружения установлены
3. Проверьте логи для конкретных ошибок

### "Cannot read dist directory"
1. Убедитесь что Build Command установлен как `npm run build`
2. Проверьте что папка `dist` создается при сборке
3. Убедитесь что `.vercelignore` не исключает `dist`

### Timeout ошибки
1. Функция может быть слишком медленной для cold start
2. Попробуйте упростить инициализацию
3. Проверьте размер зависимостей

## Следующие шаги

После успешного тестирования мы:
1. Включим полную функциональность NestJS
2. Подключим базу данных
3. Настроим все API endpoints
4. Протестируем с Telegram ботом 