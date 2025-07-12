# Деплой на Vercel

## Важно: Пошаговое тестирование

Мы обновили тестовую версию для отладки проблемы с папкой dist.

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

### Шаг 2: Отладка файловой системы

Если базовая функциональность работает, проверьте:
- `https://your-project.vercel.app/api/posts` (или любой другой endpoint)
- Это покажет отладочную информацию о папке dist

**Ожидаемый ответ:**
```json
{
  "status": "debug",
  "message": "Отладочная информация о файловой системе",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "distInfo": {
    "/var/task/dist": {
      "exists": true,
      "isDirectory": true,
      "files": ["src", "scripts"],
      "filesCount": 3
    }
  },
  "envInfo": {
    "__dirname": "/var/task/api",
    "process.cwd()": "/var/task"
  },
  "rootFiles": ["api", "dist", "package.json"]
}
```

### Шаг 3: Решение проблемы с dist

Если папка dist не найдена, проверьте:
1. Что `buildCommand` установлен в `npm run build`
2. Что `includeFiles` включает `dist/**`
3. Что `.vercelignore` НЕ исключает папку dist

## Обновленная конфигурация

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node",
      "config": {
        "maxLambdaSize": "50mb",
        "includeFiles": "dist/**"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ],
  "installCommand": "npm install --production=false",
  "buildCommand": "npm run build",
  "outputDirectory": ".",
  "env": {
    "NODE_ENV": "production"
  }
}
```

### .vercelignore
```
node_modules
.git
.env
.env.local
.env.example
*.log
test
coverage
src
tsconfig.json
eslint.config.js
.eslintrc.js
.prettierrc
jest.config.js
README.md
Dockerfile
docker-compose.yml
.dockerignore
scripts
# ВАЖНО: dist папка НЕ исключается - она нужна для serverless функции
```

## Структура проекта для Vercel

```
project/
├── api/
│   └── index.js          # Обновленная serverless функция с отладкой
├── src/                  # Исходный код NestJS
├── dist/                 # Собранный код (создается при сборке)
├── vercel.json           # Обновленная конфигурация Vercel
├── .vercelignore         # Обновленные исключения для Vercel
└── package.json
```

## Подготовка к деплою

1. **Соберите проект:**
   ```bash
   npm run build
   ```

2. **Убедитесь что есть все файлы:**
   - `api/index.js` - обновленная функция с отладкой
   - `vercel.json` - обновленная конфигурация
   - `.vercelignore` - обновленные исключения
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

### Шаг 2: Проверьте файловую систему
Откройте `https://your-project.vercel.app/api/posts` (или любой другой endpoint)

**Если видите "debug" статус** - получите информацию о папке dist ✅  
**Если все еще ошибка** - проверьте настройки сборки

### Шаг 3: Проверьте логи
В Vercel Dashboard:
1. Перейдите в Functions
2. Нажмите на функцию
3. Посмотрите логи для деталей ошибок

## Общие проблемы

### "Dist directory not found"
**Решение:**
1. Проверьте что `buildCommand` установлен как `npm run build`
2. Убедитесь что `includeFiles`: `"dist/**"` добавлен в config
3. Проверьте что `.vercelignore` не исключает папку dist
4. Убедитесь что папка dist создается при сборке локально

### "This Serverless Function has crashed"
1. Проверьте что `npm run build` работает локально
2. Убедитесь что все переменные окружения установлены
3. Проверьте логи для конкретных ошибок

### Timeout ошибки
1. Функция может быть слишком медленной для cold start
2. Попробуйте упростить инициализацию
3. Проверьте размер зависимостей

## Следующие шаги

После успешного тестирования папки dist мы:
1. Включим полную функциональность NestJS
2. Подключим базу данных
3. Настроим все API endpoints
4. Протестируем с Telegram ботом 