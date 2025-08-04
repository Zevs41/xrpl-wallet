import { IsString } from 'class-validator';

export class ReqImportXrplDto {
  @IsString()
  seed: string;
}
