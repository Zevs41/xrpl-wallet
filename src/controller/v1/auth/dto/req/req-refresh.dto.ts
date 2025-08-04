import { IsString, IsUUID } from 'class-validator';

export class ReqRefreshDto {
  @IsString()
  @IsUUID()
  token: string;
}
