import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { TagService } from '../src/services/tag.service';
import { PostService } from '../src/services/post.service';
import { Tag } from '../src/entities/tag.entity';

async function seedSimple() {
  console.log('Creating test data...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const tagService = app.get(TagService);
  const postService = app.get(PostService);

  try {
    // Check existing tags
    const existingTags = await tagService.findAll();
    console.log(`Found ${existingTags.length} existing tags`);

    // Create tags if they don't exist
    const tagLabels = [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'React',
      'Backend',
    ];
    const createdTags: Tag[] = [];

    for (const label of tagLabels) {
      const existingTag = existingTags.find((tag) => tag.label === label);
      if (existingTag) {
        console.log(`Tag "${label}" already exists`);
        createdTags.push(existingTag);
      } else {
        const newTag = await tagService.create({ label });
        console.log(`Created new tag "${label}"`);
        createdTags.push(newTag);
      }
    }

    // Get tag references
    const jsTag = createdTags.find((tag) => tag.label === 'JavaScript')!;
    const tsTag = createdTags.find((tag) => tag.label === 'TypeScript')!;
    const nodeTag = createdTags.find((tag) => tag.label === 'Node.js')!;
    const reactTag = createdTags.find((tag) => tag.label === 'React')!;
    const backendTag = createdTags.find((tag) => tag.label === 'Backend')!;

    // Check existing posts
    const existingPosts = await postService.findAll();
    console.log(`Found ${existingPosts.length} existing posts`);

    // Posts to create
    const postsToCreate = [
      {
        title: 'Getting Started with TypeScript',
        paragraph:
          'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Learn the basics of TypeScript and why you should use it in your projects.',
        description: 'Introduction to TypeScript fundamentals',
        content: `# Getting Started with TypeScript

TypeScript is a programming language developed by Microsoft.

## Key Benefits

- Static typing for better code quality
- Modern JavaScript features
- Enhanced IDE support

## Example Code

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

TypeScript helps you write better JavaScript!`,
        tagIds: [tsTag.id, jsTag.id],
      },
      {
        title: 'Modern JavaScript Features in 2024',
        paragraph:
          'JavaScript continues to evolve with new features added every year. Explore the latest additions to the language and how to use them effectively.',
        description: 'Overview of modern JavaScript features',
        content: `# Modern JavaScript Features

JavaScript ES2024 brings many useful features for developers.

## New Features

### Array Methods

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const lastEven = numbers.findLast(n => n % 2 === 0); // 4
\`\`\`

### String Methods

\`\`\`javascript
const text = "Hello World";
const result = text.at(-1); // "d"
\`\`\`

These features make JavaScript development more enjoyable!`,
        tagIds: [jsTag.id],
      },
      {
        title: 'Building REST APIs with NestJS',
        paragraph:
          'NestJS is a progressive framework for Node.js that provides a solid architecture for building efficient and scalable server-side applications.',
        description: 'Complete guide to building APIs with NestJS',
        content: `# Building REST APIs with NestJS

NestJS provides a powerful platform for server-side applications.

## Core Concepts

- Modules for code organization
- Controllers for HTTP requests
- Services for business logic
- Guards for authentication

## Example Controller

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

NestJS makes API development elegant and scalable!`,
        tagIds: [nodeTag.id, tsTag.id, backendTag.id],
      },
      {
        title: 'React Hooks Deep Dive',
        paragraph:
          'React Hooks revolutionized how we write React components. Learn advanced patterns and best practices for using hooks effectively in your applications.',
        description: 'Advanced React Hooks patterns and practices',
        content: `# React Hooks Deep Dive

React Hooks provide a powerful way to use state and other React features.

## Common Hooks

### useState

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

### Custom Hooks

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
}
\`\`\`

Hooks make React development more intuitive and powerful!`,
        tagIds: [reactTag.id, jsTag.id],
      },
    ];

    // Create posts that don't exist
    let createdPostsCount = 0;
    for (const postData of postsToCreate) {
      const existingPost = existingPosts.find(
        (post) => post.title === postData.title,
      );
      if (!existingPost) {
        await postService.create(postData);
        console.log(`Created post: "${postData.title}"`);
        createdPostsCount++;
      } else {
        console.log(`Post "${postData.title}" already exists`);
      }
    }

    console.log('\nResult:');
    console.log(`Total tags: ${createdTags.length}`);
    console.log(`Total posts: ${existingPosts.length + createdPostsCount}`);
    console.log(`New posts created: ${createdPostsCount}`);
    console.log('\nDatabase is ready!');
  } catch (error) {
    console.error(
      'Error creating test data:',
      error instanceof Error ? error.message : String(error),
    );
  } finally {
    await app.close();
  }
}

seedSimple().catch(console.error);
