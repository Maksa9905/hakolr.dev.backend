import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { QueryPostsDto } from '../dto/query-posts.dto';
import { PaginatedResponse } from '../dto/paginated-response.dto';
import { PostsStatsDto } from '../dto/posts-stats.dto';
import { TagService } from './tag.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private tagService: TagService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findAllPaginated(
    query: QueryPostsDto,
  ): Promise<PaginatedResponse<Post>> {
    const { tagIds, title, search } = query;

    // Валидация и нормализация параметров пагинации
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(Math.max(1, query.limit || 10), 100);
    const skip = (page - 1) * limit;

    // Преобразуем строку tagIds в массив
    const tagIdsArray = tagIds
      ? tagIds
          .split(',')
          .map((id) => id.trim())
          .filter((id) => id.length > 0)
      : [];

    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // Фильтрация по тегам (логика ИЛИ между тегами)
    // Для simple-array используем проверку через LIKE
    if (tagIdsArray.length > 0) {
      const tagConditions = tagIdsArray.map((tagId, index) => {
        return `post.tagIds LIKE :tagId${index}`;
      });

      const tagParams: Record<string, string> = {};
      tagIdsArray.forEach((tagId, index) => {
        tagParams[`tagId${index}`] = `%${tagId}%`;
      });

      queryBuilder.andWhere(`(${tagConditions.join(' OR ')})`, tagParams);
    }

    // Фильтрация по заголовку (логика И с предыдущими условиями)
    if (title) {
      queryBuilder.andWhere('post.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    // Поиск по содержимому (логика И с предыдущими условиями)
    if (search) {
      queryBuilder.andWhere(
        '(post.title ILIKE :search OR post.description ILIKE :search OR post.content ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Итоговая логика: (tag1 ИЛИ tag2 ИЛИ ...) И заголовок И поиск

    // Получаем общее количество записей
    const total = await queryBuilder.getCount();

    // Применяем пагинацию
    const posts = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: posts,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async getPostsStats(): Promise<PostsStatsDto> {
    // Получаем 3 последних поста
    const latestPosts = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      take: 3,
    });

    // Получаем самый популярный пост (по просмотрам)
    const mostPopularPost = await this.postRepository.findOne({
      where: {},
      order: { views: 'DESC' },
    });

    // Получаем самый залайканный пост
    const mostLikedPost = await this.postRepository.findOne({
      where: {},
      order: { likes: 'DESC' },
    });

    return {
      latestPosts,
      mostPopularPost: mostPopularPost || null,
      mostLikedPost: mostLikedPost || null,
    };
  }

  async incrementViews(id: string): Promise<void> {
    await this.postRepository.increment({ id }, 'views', 1);
  }

  async incrementLikes(id: string): Promise<Post> {
    await this.postRepository.increment({ id }, 'likes', 1);
    return await this.findOne(id);
  }

  async decrementLikes(id: string): Promise<Post> {
    const post = await this.findOne(id);
    if (post.likes > 0) {
      await this.postRepository.decrement({ id }, 'likes', 1);
    }
    return await this.findOne(id);
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Публикация с ID ${id} не найдена`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Публикация с ID ${id} не найдена`);
    }
  }

  async findByTags(tagIds: string[]): Promise<Post[]> {
    if (!tagIds || tagIds.length === 0) {
      return [];
    }

    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // Для simple-array используем проверку через LIKE
    const tagConditions = tagIds.map((tagId, index) => {
      return `post.tagIds LIKE :tagId${index}`;
    });

    const tagParams: Record<string, string> = {};
    tagIds.forEach((tagId, index) => {
      tagParams[`tagId${index}`] = `%${tagId}%`;
    });

    queryBuilder.andWhere(`(${tagConditions.join(' OR ')})`, tagParams);

    return await queryBuilder.getMany();
  }
}
