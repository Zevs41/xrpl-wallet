import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from 'src/common/config/config';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { MinioModule } from './minio/minio.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config],
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    MinioModule,
  ],
})
export class CommonModule {}
