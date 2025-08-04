import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUrl } from 'class-validator';

export class ReqSendFileMessageDto {
  @ApiProperty({
    description: 'Ссылка на файл',
  })
  @IsDefined()
  @IsUrl({ host_whitelist: ['localhost'] }) //Оставил для тестов
  url: string;
}
