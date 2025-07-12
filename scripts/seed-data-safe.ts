import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { TagService } from '../src/services/tag.service';
import { PostService } from '../src/services/post.service';
import { Tag } from '../src/entities/tag.entity';

async function seedSafe() {
  console.log('🌱 Безопасное создание тестовых данных...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const tagService = app.get(TagService);
  const postService = app.get(PostService);

  try {
    // Проверяем существующие теги
    const existingTags = await tagService.findAll();
    console.log(`📋 Найдено ${existingTags.length} существующих тегов`);

    // Создаем теги только если их нет
    const tagLabels = [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'React',
      'Web Development',
    ];
    const createdTags: Tag[] = [];

    for (const label of tagLabels) {
      const existingTag = existingTags.find((tag) => tag.label === label);
      if (existingTag) {
        console.log(`✅ Тег "${label}" уже существует`);
        createdTags.push(existingTag);
      } else {
        const newTag = await tagService.create({ label });
        console.log(`🆕 Создан новый тег "${label}"`);
        createdTags.push(newTag);
      }
    }

    // Получаем ссылки на теги
    const jsTag = createdTags.find((tag) => tag.label === 'JavaScript')!;
    const tsTag = createdTags.find((tag) => tag.label === 'TypeScript')!;
    const nodeTag = createdTags.find((tag) => tag.label === 'Node.js')!;
    const reactTag = createdTags.find((tag) => tag.label === 'React')!;
    const webTag = createdTags.find((tag) => tag.label === 'Web Development')!;

    // Проверяем существующие публикации
    const existingPosts = await postService.findAll();
    console.log(`📄 Найдено ${existingPosts.length} существующих публикаций`);

    // Публикации для создания
    const postsToCreate = [
      {
        title: 'Введение в TypeScript для начинающих',
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
        title: 'Создание REST API с NestJS: Полное руководство',
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
      {
        title: 'Микросервисная архитектура с Node.js',
        paragraph:
          'Микросервисная архитектура становится стандартом для современных веб-приложений. В этой статье рассмотрим как проектировать и реализовывать микросервисы на Node.js, их преимущества и подводные камни.',
        description: 'Практическое руководство по микросервисам',
        content: `# Микросервисная архитектура с Node.js

Микросервисы позволяют создавать масштабируемые и гибкие приложения.

## Преимущества микросервисов

- **Независимое развертывание** — каждый сервис можно обновлять отдельно
- **Технологическое разнообразие** — разные сервисы могут использовать разные технологии
- **Масштабируемость** — можно масштабировать только нужные компоненты

## Пример архитектуры

\`\`\`javascript
// User Service
app.get('/api/users/:id', async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  res.json(user);
});

// Order Service
app.post('/api/orders', async (req, res) => {
  const order = await orderService.create(req.body);
  await eventBus.publish('order.created', order);
  res.json(order);
});
\`\`\`

Правильное проектирование микросервисов — ключ к успеху!`,
        tagIds: [nodeTag.id, webTag.id],
      },
    ];

    // Создаем публикации, которых еще нет
    let createdPostsCount = 0;
    for (const postData of postsToCreate) {
      const existingPost = existingPosts.find(
        (post) => post.title === postData.title,
      );
      if (!existingPost) {
        await postService.create(postData);
        console.log(`📝 Создана публикация: "${postData.title}"`);
        createdPostsCount++;
      } else {
        console.log(`✅ Публикация "${postData.title}" уже существует`);
      }
    }

    console.log('\n🎉 Результат:');
    console.log(`📋 Тегов всего: ${createdTags.length}`);
    console.log(
      `📄 Публикаций всего: ${existingPosts.length + createdPostsCount}`,
    );
    console.log(`🆕 Создано новых публикаций: ${createdPostsCount}`);
    console.log('\n✅ База данных готова к работе!');
  } catch (error) {
    console.error(
      '❌ Ошибка при создании тестовых данных:',
      error instanceof Error ? error.message : String(error),
    );
  } finally {
    await app.close();
  }
}

seedSafe().catch(console.error);
