import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { TagService } from '../src/services/tag.service';
import { PostService } from '../src/services/post.service';

async function seed() {
  console.log('🌱 Создание тестовых данных...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const tagService = app.get(TagService);
  const postService = app.get(PostService);

  try {
    // Создаем теги
    const jsTag = await tagService.create({ label: 'JavaScript' });
    const tsTag = await tagService.create({ label: 'TypeScript' });
    const nodeTag = await tagService.create({ label: 'Node.js' });
    const reactTag = await tagService.create({ label: 'React' });
    const webTag = await tagService.create({ label: 'Web Development' });

    console.log('✅ Теги созданы');

    // Создаем публикации
    const posts = [
      {
        title: 'Введение в TypeScript',
        paragraph:
          'TypeScript - это типизированный JavaScript, который компилируется в обычный JavaScript. В этой статье мы рассмотрим основные возможности TypeScript и преимущества его использования в современной веб-разработке.',
        description: 'Изучаем основы TypeScript и его преимущества',
        content: `# Введение в TypeScript

TypeScript — это язык программирования, разработанный Microsoft, который является надмножеством JavaScript.

## Основные преимущества

- **Статическая типизация** — проверка типов на этапе компиляции
- **Современный синтаксис** — поддержка новейших возможностей ECMAScript
- **Лучшая IDE поддержка** — автодополнение, рефакторинг, навигация по коду

## Пример кода

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(userData: Partial<User>): User {
  return {
    id: Math.random(),
    name: userData.name || '',
    email: userData.email || ''
  };
}
\`\`\`

TypeScript позволяет писать более надежный и поддерживаемый код!`,
        tagIds: [tsTag.id, jsTag.id, webTag.id],
      },
      {
        title: 'Современные возможности JavaScript ES2023',
        paragraph:
          'JavaScript продолжает развиваться, и каждый год в язык добавляются новые возможности. В этой статье мы рассмотрим самые интересные нововведения ES2023 и как их можно использовать в реальных проектах.',
        description: 'Обзор новых возможностей JavaScript ES2023',
        content: `# Современные возможности JavaScript ES2023

JavaScript ES2023 принес множество полезных нововведений для разработчиков.

## Новые возможности

### Array.prototype.findLast()

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const lastEven = numbers.findLast(n => n % 2 === 0); // 4
\`\`\`

### Array.prototype.toSorted()

\`\`\`javascript
const fruits = ['banana', 'apple', 'orange'];
const sorted = fruits.toSorted(); // ['apple', 'banana', 'orange']
// Оригинальный массив не изменился
\`\`\`

Эти методы делают работу с массивами еще более удобной!`,
        tagIds: [jsTag.id, webTag.id],
      },
      {
        title: 'Создание REST API с NestJS',
        paragraph:
          'NestJS - это прогрессивный фреймворк для Node.js, который использует TypeScript и предоставляет готовую архитектуру для создания эффективных и масштабируемых серверных приложений. В этой статье мы создадим полноценный REST API.',
        description: 'Пошаговое руководство по созданию API с NestJS',
        content: `# Создание REST API с NestJS

NestJS предоставляет мощную платформу для создания серверных приложений.

## Основные концепции

- **Модули** — организация кода в логические блоки
- **Контроллеры** — обработка HTTP запросов
- **Сервисы** — бизнес-логика приложения
- **Guards** — авторизация и аутентификация

## Пример контроллера

\`\`\`typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
\`\`\`

NestJS делает создание API простым и элегантным!`,
        tagIds: [nodeTag.id, tsTag.id, webTag.id],
      },
      {
        title: 'React Hooks: useEffect и его секреты',
        paragraph:
          'Хук useEffect является одним из самых важных и часто используемых хуков в React. Однако его правильное использование может вызывать вопросы даже у опытных разработчиков. Разберем все тонкости работы с useEffect.',
        description: 'Глубокое погружение в работу с useEffect в React',
        content: `# React Hooks: useEffect и его секреты

useEffect — это один из основных хуков React для работы с побочными эффектами.

## Основные случаи использования

### Эффект при каждом рендере

\`\`\`javascript
useEffect(() => {
  console.log('Компонент отрендерился');
});
\`\`\`

### Эффект только при маунте

\`\`\`javascript
useEffect(() => {
  fetchData();
}, []); // Пустой массив зависимостей
\`\`\`

### Эффект с зависимостями

\`\`\`javascript
useEffect(() => {
  updateTitle(count);
}, [count]); // Эффект запустится при изменении count
\`\`\`

## Очистка эффектов

\`\`\`javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(timer); // Очистка
}, []);
\`\`\`

Правильное использование useEffect — ключ к производительности!`,
        tagIds: [reactTag.id, jsTag.id, webTag.id],
      },
    ];

    for (const postData of posts) {
      await postService.create(postData);
    }

    console.log('✅ Публикации созданы');
    console.log('🎉 Тестовые данные успешно добавлены!');
  } catch (error) {
    console.error('❌ Ошибка при создании тестовых данных:', error);
  } finally {
    await app.close();
  }
}

seed().catch(console.error);
