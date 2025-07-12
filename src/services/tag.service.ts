import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: { label: createTagDto.label },
    });

    if (existingTag) {
      throw new ConflictException(
        `Тег с названием "${createTagDto.label}" уже существует`,
      );
    }

    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    // Возвращаем все теги, включая специальные
    return await this.tagRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Тег с ID ${id} не найден`);
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);

    if (updateTagDto.label) {
      const existingTag = await this.tagRepository.findOne({
        where: { label: updateTagDto.label },
      });

      if (existingTag && existingTag.id !== id) {
        throw new ConflictException(
          `Тег с названием "${updateTagDto.label}" уже существует`,
        );
      }
    }

    Object.assign(tag, updateTagDto);
    return await this.tagRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);

    // Запрещаем удаление специальных тегов
    if (tag.isMostPopular || tag.isMostLiked) {
      throw new ConflictException('Нельзя удалить специальный тег');
    }

    const result = await this.tagRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Тег с ID ${id} не найден`);
    }
  }

  async findOrCreateSpecialTag(
    label: string,
    isMostPopular: boolean = false,
    isMostLiked: boolean = false,
  ): Promise<Tag> {
    let tag = await this.tagRepository.findOne({
      where: { isMostPopular, isMostLiked },
    });

    if (!tag) {
      tag = this.tagRepository.create({
        label,
        isMostPopular,
        isMostLiked,
      });
      await this.tagRepository.save(tag);
    }

    return tag;
  }

  async getMostPopularTag(): Promise<Tag> {
    return await this.findOrCreateSpecialTag('Самый популярный', true, false);
  }

  async getMostLikedTag(): Promise<Tag> {
    return await this.findOrCreateSpecialTag('Самый залайканный', false, true);
  }
}
