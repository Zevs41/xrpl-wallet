import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioClientService } from 'src/common/minio/minio.service';
import { ResFileDto } from 'src/common/minio/dto/res-file.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private minioService: MinioClientService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ResFileDto> {
    return this.minioService.uploadFile(file);
  }
}
