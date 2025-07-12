import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  label?: string;
}
