import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ReqCreateWalletProfileDto {
  @IsString()
  @IsUUID()
  profileUuid: string;

  @IsBoolean()
  visibility: boolean;
}
