import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  label: string;

  @IsBoolean()
  @IsOptional()
  isMostPopular?: boolean;

  @IsBoolean()
  @IsOptional()
  isMostLiked?: boolean;
}
