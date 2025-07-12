# Деплой на Vercel

## Структура проекта для Vercel

```
project/
├── api/
│   └── index.js          # Serverless функция для Vercel
├── src/                  # Исходный код NestJS
├── dist/                 # Собранный код (создается при сборке)
├── vercel.json           # Конфигурация Vercel
└── package.json
```

## Подготовка к деплою

1. **Соберите проект:**
   ```bash
   npm run build
   ```

2. **Убедитесь что есть все файлы:**
   - `api/index.js` - точка входа для Vercel
   - `vercel.json` - конфигурация
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

**База данных (см. следующий шаг):**
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Шаг 4: Настройка базы данных

#### Вариант 1: Neon (рекомендуется)
1. Зайдите на [Neon](https://neon.tech/)
2. Создайте бесплатный аккаунт
3. Создайте новую базу данных
4. Скопируйте connection string
5. Добавьте в Vercel как `DATABASE_URL`

#### Вариант 2: Supabase
1. Зайдите на [Supabase](https://supabase.com/)
2. Создайте проект
3. Получите connection string из Settings → Database
4. Добавьте в Vercel как `DATABASE_URL`

### Шаг 5: Деплой
1. Нажмите "Deploy"
2. Дождитесь завершения сборки
3. Получите URL (например: `https://your-project.vercel.app`)

## Проверка работы

1. **API endpoints:**
   - `https://your-project.vercel.app/api/posts`
   - `https://your-project.vercel.app/api/tags`

2. **Telegram бот:**
   - Отправьте `/start` боту
   - Должен вернуть JWT токен и ссылку на фронтенд

## Важные особенности

### Холодный старт
- Первый запрос может занять 3-5 секунд
- Это нормально для serverless функций
- Последующие запросы будут быстрее

### Лимиты Vercel (бесплатный план)
- 100 GB трафика в месяц
- 100 деплоев в месяц
- 10 секунд максимальное время выполнения

### Автоматические деплои
- Production: push в `main` ветку
- Preview: создание pull request

## Troubleshooting

### Ошибка "No Production Deployment"
- Проверьте что `npm run build` выполняется без ошибок
- Убедитесь что `api/index.js` существует
- Проверьте конфигурацию `vercel.json`

### Ошибки базы данных
- Убедитесь что `DATABASE_URL` правильно настроен
- Проверьте что база данных доступна из интернета
- Для Neon: используйте connection string с `?sslmode=require`

### 500 Internal Server Error
- Проверьте логи в Vercel dashboard
- Убедитесь что все переменные окружения настроены
- Проверьте что JWT_SECRET установлен

### CORS ошибки
- Убедитесь что домен фронтенда добавлен в `main.ts`
- Проверьте что `credentials: true` настроен правильно

## Мониторинг
- Логи: Vercel Dashboard → Functions → View Function Logs
- Метрики: Vercel Dashboard → Analytics
- Alerts: Vercel Dashboard → Settings → Notifications 