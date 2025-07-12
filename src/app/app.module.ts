import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../config/database.config';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../modules/post.module';
import { TagModule } from '../modules/tag.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    PostModule,
    TagModule,
    TelegramModule,
  ],
})
export class AppModule {}
