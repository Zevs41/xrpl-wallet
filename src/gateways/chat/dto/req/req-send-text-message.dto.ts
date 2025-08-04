import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class ReqSendTextMessageDto {
  @ApiProperty({
    description: 'Текст сообщения',
  })
  @IsDefined()
  @IsString()
  text: string;
}
