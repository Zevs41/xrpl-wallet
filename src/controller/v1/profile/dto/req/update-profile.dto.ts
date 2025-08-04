import { PartialType } from '@nestjs/swagger';
import { ReqCreateProfileDto } from './create-profile.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ReqUpdateProfileDto extends PartialType(ReqCreateProfileDto) {
  @IsOptional()
  @IsString()
  @IsUUID()
  walletUuid: string;
}
