import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfig } from '../config/config.interface';
import { RedisService } from './redis.service';
import { RedisBaseAdapter } from './redis-base.adapter';

@Global()
@Module({
  providers: [
    {
      provide: RedisService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig>) =>
        new RedisBaseAdapter(configService),
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
