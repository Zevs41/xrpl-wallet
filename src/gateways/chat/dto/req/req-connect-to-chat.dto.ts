import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class ReqConnectToChatDto {
  @ApiProperty({
    description: 'Jwt токен',
  })
  @IsDefined()
  @IsString()
  jwtToken: string;

  @ApiProperty({
    description:
      'Уникальный идентификатор профиля, в чат к которому присоединиться',
  })
  @IsDefined()
  @IsUUID()
  profileUuid: string;
}
