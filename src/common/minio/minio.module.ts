import { Global, Module } from '@nestjs/common';

import { MinioClientService } from './minio.service';

@Global()
@Module({
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioModule {}
