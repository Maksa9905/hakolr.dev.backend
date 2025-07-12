import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  label?: string;

  @IsBoolean()
  @IsOptional()
  isMostPopular?: boolean;

  @IsBoolean()
  @IsOptional()
  isMostLiked?: boolean;
}
