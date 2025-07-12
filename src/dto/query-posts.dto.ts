import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPostsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  tagIds?: string; // Строка с ID тегов, разделенных запятыми

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
