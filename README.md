<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Hakolr Blog Backend

REST API для блога на NestJS с TypeORM, PostgreSQL и авторизацией через Telegram бота.

## 🚀 Возможности

- ✅ CRUD операции для публикаций и тегов
- ✅ JWT авторизация (срок действия 3 часа)
- ✅ Telegram бот для получения токена доступа
- ✅ Автоматическое вычисление размера публикации (5-9)
- ✅ **Пагинация публикаций** (настраиваемое количество на страницу)
- ✅ **Фильтрация публикаций по тегам** (логика "ИЛИ" между тегами, "И" между фильтрами)
- ✅ **Поиск по заголовкам публикаций**
- ✅ **Полнотекстовый поиск** по заголовку, описанию и содержимому
- ✅ **Комбинированные запросы** (пагинация + фильтрация + поиск)
- ✅ **Система лайков** (добавление/удаление лайков)
- ✅ **Счетчик просмотров** (автоматическое увеличение при просмотре поста)
- ✅ **Статистика постов** (последние, популярные, залайканные)
- ✅ **Специальные теги** (для идентификации популярных постов)
- ✅ **Временные метки** (дата создания и обновления)
- ✅ Валидация данных
- ✅ CORS поддержка для фронтенда

## 🛠 Технологии

- **NestJS** - фреймворк для Node.js
- **TypeORM** - ORM для работы с базой данных
- **PostgreSQL** - база данных
- **JWT** - авторизация
- **Telegram Bot API** - бот для авторизации
- **class-validator** - валидация DTO

## 📋 Требования

- Node.js 18+
- PostgreSQL 12+
- npm или yarn

## ⚙️ Установка и настройка

1. **Клонируйте репозиторий и установите зависимости:**
   ```bash
   git clone <your-repo>
   cd hakolr.dev.backend
   npm install
   ```

2. **Настройте базу данных PostgreSQL:**
   ```sql
   CREATE DATABASE hakolr_blog;
   ```

3. **Создайте файл `.env` в корне проекта:**
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your-password
   DB_DATABASE=hakolr_blog

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRES_IN=3h

   # Auth Configuration
   ADMIN_LOGIN=your-login
   ADMIN_PASSWORD=your-password

   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token-from-botfather

   # Frontend URL
   FRONTEND_URL=https://hakolr-dev-frontend.vercel.app/editing

   # Server Port
   PORT=3001
   ```

4. **Создайте Telegram бота:**
   - Напишите [@BotFather](https://t.me/botfather) в Telegram
   - Создайте нового бота командой `/newbot`
   - Получите токен и добавьте его в `.env`

## 🚀 Запуск

### Режим разработки
```bash
npm run start:dev
```

### Продакшен
```bash
npm run build
npm run start:prod
```

Сервер будет доступен по адресу: `http://localhost:3001`
API будет доступно по адресу: `http://localhost:3001/api`

## 📡 API Endpoints

### Публикации (Posts)

| Метод | Endpoint | Описание | Авторизация |
|-------|----------|----------|-------------|
| GET | `/api/posts` | Получить все публикации с пагинацией | ❌ |
| GET | `/api/posts/stats` | Получить статистику постов | ❌ |
| GET | `/api/posts/{id}` | Получить публикацию по ID (увеличивает просмотры) | ❌ |
| POST | `/api/posts` | Создать публикацию | ✅ |
| POST | `/api/posts/{id}/like` | Поставить лайк публикации | ❌ |
| DELETE | `/api/posts/{id}/like` | Убрать лайк с публикации | ❌ |
| PATCH | `/api/posts/{id}` | Обновить публикацию | ✅ |
| DELETE | `/api/posts/{id}` | Удалить публикацию | ✅ |

#### Параметры запроса для GET /api/posts:
- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество постов на страницу (по умолчанию: 10, максимум: 100)
- `tagIds` - фильтрация по ID тегов (строка через запятую, логика "ИЛИ")
- `title` - поиск по заголовку (частичное совпадение)
- `search` - поиск по заголовку, описанию и содержимому

#### Примеры запросов:
```
GET /api/posts?page=1&limit=5
GET /api/posts?tagIds=uuid-tag-id-1
GET /api/posts?tagIds=uuid-tag-id-1,uuid-tag-id-2
GET /api/posts?title=TypeScript
GET /api/posts?search=JavaScript
GET /api/posts?page=2&limit=10&tagIds=uuid-tag-id-1,uuid-tag-id-2&search=API
```

#### Структура ответа со статистикой (GET /api/posts/stats):
```json
{
  "latestPosts": [
    {
      "id": "uuid",
      "title": "Последний пост 1",
      "paragraph": "Описание...",
      "description": "Краткое описание",
      "content": "Содержимое...",
      "tagIds": ["tag-1"],
      "size": 7,
      "likes": 15,
      "views": 120,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "mostPopularPost": {
    "id": "uuid",
    "title": "Самый популярный пост",
    "tagIds": ["tag-1"],
    "views": 500,
    "likes": 25
  },
  "mostLikedPost": {
    "id": "uuid", 
    "title": "Самый залайканный пост",
    "tagIds": ["tag-2"],
    "views": 300,
    "likes": 50
  }
}
```

#### Структура ответа с пагинацией:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Заголовок публикации",
      "paragraph": "Развернутое описание статьи",
      "description": "Краткое описание статьи",
      "content": "Содержимое в формате markdown",
      "tagIds": ["tag-id-1", "tag-id-2"],
      "size": 7,
      "likes": 10,
      "views": 150,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Структура публикации:
```json
{
  "id": "uuid",
  "title": "Заголовок публикации",
  "paragraph": "Развернутое описание статьи",
  "description": "Краткое описание статьи",
  "content": "Содержимое в формате markdown",
  "tagIds": ["tag-id-1", "tag-id-2"],
  "size": 7,
  "likes": 10,
  "views": 150,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Теги (Tags)

| Метод | Endpoint | Описание | Авторизация |
|-------|----------|----------|-------------|
| GET | `/api/tags` | Получить все теги | ❌ |
| GET | `/api/tags/{id}` | Получить тег по ID | ❌ |
| POST | `/api/tags` | Создать тег | ✅ |
| PATCH | `/api/tags/{id}` | Обновить тег | ✅ |
| DELETE | `/api/tags/{id}` | Удалить тег | ✅ |

#### Структура тега:
```json
{
  "id": "uuid",
  "label": "Название тега",
  "isMostPopular": false,
  "isMostLiked": false
}
```

## 🔐 Авторизация

### Получение токена через Telegram бота

1. Найдите вашего бота в Telegram
2. Напишите `/start`
3. Введите логин и пароль (из `.env`)
4. Получите ссылку с токеном для доступа к панели редактирования

### Использование токена в API

Добавьте заголовок `Authorization` с Bearer токеном:
```
Authorization: Bearer your-jwt-token-here
```

## 📝 Примеры использования

### Получение публикаций с пагинацией
```bash
# Первая страница, 5 постов
curl -X GET "http://localhost:3001/api/posts?page=1&limit=5"

# Вторая страница, 10 постов  
curl -X GET "http://localhost:3001/api/posts?page=2&limit=10"
```

### Фильтрация публикаций
```bash
# По одному тегу
curl -X GET "http://localhost:3001/api/posts?tagIds=your-tag-id"

# По нескольким тегам (логика ИЛИ - пост должен содержать хотя бы один из указанных тегов)
curl -X GET "http://localhost:3001/api/posts?tagIds=tag-id-1,tag-id-2"

# По заголовку (частичное совпадение)
curl -X GET "http://localhost:3001/api/posts?title=TypeScript"

# Полнотекстовый поиск
curl -X GET "http://localhost:3001/api/posts?search=JavaScript"

# Комбинированная фильтрация (логика И): теги И поиск И заголовок
curl -X GET "http://localhost:3001/api/posts?tagIds=tag-id-1&search=JavaScript"

# Комбинированная фильтрация: (tag1 ИЛИ tag2) И поиск И заголовок
curl -X GET "http://localhost:3001/api/posts?tagIds=tag-id-1,tag-id-2&search=React&title=Tutorial"
```

### Комбинированные запросы
```bash
# Пагинация + фильтрация по одному тегу
curl -X GET "http://localhost:3001/api/posts?page=1&limit=5&tagIds=your-tag-id"

# Пагинация + фильтрация по нескольким тегам
curl -X GET "http://localhost:3001/api/posts?page=1&limit=5&tagIds=tag-id-1,tag-id-2"

# Пагинация + поиск
curl -X GET "http://localhost:3001/api/posts?page=1&limit=3&search=NestJS"

# Все параметры вместе
curl -X GET "http://localhost:3001/api/posts?page=1&limit=5&tagIds=tag-id-1,tag-id-2&search=API"
```

### Статистика постов
```bash
# Получить статистику (3 последних + самый популярный + самый залайканный)
curl -X GET "http://localhost:3001/api/posts/stats"

# Получить все теги
curl -X GET "http://localhost:3001/api/tags"
```

### Лайки и просмотры
```bash
# Поставить лайк публикации
curl -X POST "http://localhost:3001/api/posts/your-post-id/like"

# Убрать лайк с публикации
curl -X DELETE "http://localhost:3001/api/posts/your-post-id/like"

# Просмотреть публикацию (автоматически увеличивает счетчик просмотров)
curl -X GET "http://localhost:3001/api/posts/your-post-id"
```

### Создание публикации
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "title": "Моя первая публикация",
    "paragraph": "Это развернутое описание моей первой публикации",
    "description": "Краткое описание",
    "content": "# Заголовок\n\nСодержимое в markdown",
    "tagIds": ["tag-id-1"]
  }'
```

### Создание тега
```bash
curl -X POST http://localhost:3001/api/tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "label": "JavaScript"
  }'
```

## 🎯 Особенности

### Автоматический расчет размера публикации
Поле `size` вычисляется автоматически на основе длины заголовка:
- <= 20 символов: размер 5
- <= 40 символов: размер 6  
- <= 60 символов: размер 7
- <= 80 символов: размер 8
- > 80 символов: размер 9

### Валидация данных
- Заголовок: максимум 255 символов
- Описание: максимум 500 символов
- Название тега: максимум 255 символов, уникальное
- Все обязательные поля проверяются на наличие

### Фильтрация по тегам
- Поддерживается фильтрация по одному тегу: `tagIds=uuid-tag-id`
- Поддерживается фильтрация по нескольким тегам: `tagIds=uuid-tag-id-1,uuid-tag-id-2`
- **Логика ИЛИ** между тегами: пост должен содержать хотя бы один из указанных тегов
- **Логика И** между разными фильтрами: теги И поиск И заголовок применяются одновременно
- Если теги не указаны, показываются все публикации
- Теги передаются как строка, разделенная запятыми в параметре `tagIds`
- Параметр `tagIds` валидируется через DTO и преобразуется в массив в сервисе

### Примеры логики фильтрации:
- `tagIds=tag1,tag2` → посты с тегом tag1 **ИЛИ** tag2
- `tagIds=tag1&search=javascript` → посты с тегом tag1 **И** содержащие "javascript"
- `tagIds=tag1,tag2&search=react` → посты с тегом (tag1 **ИЛИ** tag2) **И** содержащие "react"

## 🔧 Структура проекта

```
src/
├── app/                 # Главный модуль приложения
├── auth/               # Модули авторизации (JWT)
├── config/             # Конфигурация (база данных)
├── controllers/        # REST контроллеры
├── dto/               # Data Transfer Objects
├── entities/          # TypeORM сущности
├── modules/           # Модули функциональности
├── services/          # Бизнес-логика
├── telegram/          # Telegram бот
└── main.ts           # Точка входа
```

## 📚 База данных

Проект использует PostgreSQL с автоматической синхронизацией схемы в режиме разработки.

### Таблицы:
- `posts` - публикации (с полями likes, views, createdAt, updatedAt)
- `tags` - теги (с флагами isMostPopular, isMostLiked)

### ⚠️ Важно при обновлении
После обновления кода база данных автоматически синхронизируется при следующем запуске приложения. Новые поля будут добавлены в таблицы:
- В таблицу `posts`: `likes`, `views`, `createdAt`, `updatedAt`
- В таблицу `tags`: `isMostPopular`, `isMostLiked`

Если хотите заполнить базу тестовыми данными:
```bash
npm run db:seed:safe
```

Для создания специальных тегов:
```bash
npm run db:special-tags
```

## 🤝 Разработка

### Режим разработки с hot reload:
```bash
npm run start:dev
```

### Запуск тестов:
```bash
npm run test
```

### Проверка кода:
```bash
npm run lint
```

## 🚀 Деплой

### Быстрый деплой с Docker

1. **Скопируйте переменные окружения:**
   ```bash
   cp .env.example .env
   ```

2. **Настройте переменные окружения в `.env`:**
   ```env
   # Обязательные переменные
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-minimum-32-characters
   ADMIN_LOGIN=your-admin-login
   ADMIN_PASSWORD=your-strong-admin-password
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token-from-botfather
   FRONTEND_URL=https://your-frontend-domain.com
   
   # Настройки базы данных
   DB_PASSWORD=your-strong-database-password
   DB_DATABASE=hakolr_blog
   
   # Настройки для продакшена
   NODE_ENV=production
   PORT=3001
   ```

3. **Запустите автоматический деплой:**
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

### Деплой через Docker Compose

```bash
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f backend

# Остановка
docker-compose down
```

### Деплой на VPS/сервере

1. **Подготовьте сервер:**
   ```bash
   # Установите Docker и Docker Compose
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Добавьте пользователя в группу docker
   sudo usermod -aG docker $USER
   
   # Перезайдите в систему
   ```

2. **Клонируйте репозиторий:**
   ```bash
   git clone <your-repo-url>
   cd hakolr.dev.backend
   ```

3. **Настройте переменные окружения:**
   ```bash
   cp .env.example .env
   nano .env  # Отредактируйте файл
   ```

4. **Запустите приложение:**
   ```bash
   ./scripts/deploy.sh
   ```

### Настройка SSL/HTTPS

Для продакшена рекомендуется использовать обратный прокси (nginx) с SSL:

```bash
# Создайте nginx.conf
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Мониторинг

```bash
# Проверка статуса контейнеров
docker-compose ps

# Просмотр логов приложения
docker-compose logs backend

# Просмотр логов базы данных
docker-compose logs postgres

# Мониторинг ресурсов
docker stats
```

### Резервное копирование

```bash
# Создание резервной копии базы данных
docker-compose exec postgres pg_dump -U postgres hakolr_blog > backup.sql

# Восстановление из резервной копии
docker-compose exec -T postgres psql -U postgres hakolr_blog < backup.sql
```

### Обновление приложения

```bash
# Получите последние изменения
git pull origin main

# Пересоберите и перезапустите
./scripts/deploy.sh
```

## 📄 Лицензия

Проект распространяется под лицензией UNLICENSED.
