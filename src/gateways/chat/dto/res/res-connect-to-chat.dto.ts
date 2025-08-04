import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';

export class ResConnectToChatDto {
  @ApiProperty({
    description: 'Уникальный идентификатор кошелька пользователя',
  })
  @IsDefined()
  @IsUUID()
  walletUuid: string;

  @ApiProperty({
    description: 'Уникальный идентификатор профиля пользователя',
  })
  @IsDefined()
  @IsUUID()
  profileUuid: string;
}
