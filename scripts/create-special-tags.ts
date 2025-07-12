import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { TagService } from '../src/services/tag.service';

async function createSpecialTags() {
  console.log('🏷️  Создание специальных тегов...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const tagService = app.get(TagService);

  try {
    // Создаем или получаем специальные теги
    const popularTag = await tagService.getMostPopularTag();
    const likedTag = await tagService.getMostLikedTag();

    console.log('✅ Специальные теги созданы:');
    console.log(`   - Самый популярный: ${popularTag.id}`);
    console.log(`   - Самый залайканный: ${likedTag.id}`);

    console.log('\n🎉 Специальные теги готовы к использованию!');
  } catch (error) {
    console.error('❌ Ошибка при создании специальных тегов:', error);
  } finally {
    await app.close();
  }
}

createSpecialTags();
