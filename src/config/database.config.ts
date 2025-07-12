import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { Post } from '../entities/post.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'hakolr_blog',
  entities: [Post, Tag],
  synchronize:
    process.env.NODE_ENV !== 'production' &&
    process.env.TYPEORM_SYNCHRONIZE !== 'false',
  logging:
    process.env.TYPEORM_LOGGING === 'true' ||
    process.env.NODE_ENV !== 'production',
  // Дополнительные настройки для продакшена
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  extra: {
    // Настройки пула соединений
    max: 10,
    min: 2,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
  },
};
