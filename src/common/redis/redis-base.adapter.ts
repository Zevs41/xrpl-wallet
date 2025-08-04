import Redis from 'ioredis';
import type { OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfig } from '../config/config.interface';
import type { RedisService } from './redis.service';

@Injectable()
export class RedisBaseAdapter
  extends Redis
  implements RedisService, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService<IConfig>) {
    super({
      host: configService.get('redis').host,
      port: configService.get('redis').port,
    });
  }

  onModuleDestroy() {
    this.disconnect();
  }

  async getJson<T>(key: string): Promise<T> {
    return JSON.parse((await this.call('JSON.GET', key)) as string);
  }

  async getAsJson<T>(key: string): Promise<T> {
    return JSON.parse((await this.get(key))!);
  }

  async setJson<T>(key: string, data: T): Promise<void> {
    await this.call('JSON.SET', key, '$', JSON.stringify(data));
  }

  async setAsJson<T>(key: string, data: T): Promise<void> {
    await this.set(key, JSON.stringify(data));
  }

  async setAsJsonEx<T>(key: string, data: T, expire: number): Promise<void> {
    await this.set(key, JSON.stringify(data), 'EX', expire);
  }

  async delKey(key: string): Promise<void> {
    await this.del(key);
  }
}
