import { IsString } from 'class-validator';

export class ResRefreshDto {
  @IsString()
  access: string;

  @IsString()
  refresh: string;
}
