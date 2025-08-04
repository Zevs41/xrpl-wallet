import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ResFileDto {
  @ApiProperty({ example: 'http://example.com/api' })
  @IsUrl()
  url: string;
}
