import {
  IsString,
  IsUrl,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReqCreateProfileDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  displayName: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsUrl()
  @IsOptional()
  xcomUrl?: string;

  @IsUrl()
  @IsOptional()
  telegramUrl?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsUrl()
  @IsOptional()
  instagramUrl?: string;

  @IsUrl({ host_whitelist: ['localhost'] }) //Оставил для тестов
  @IsOptional()
  avatarUrl?: string;
}
