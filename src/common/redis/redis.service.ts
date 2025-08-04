import { Injectable } from '@nestjs/common';
import { Transaction } from 'ioredis/built/transaction';
import Commander from 'ioredis/built/utils/Commander';
import { ChainableCommander } from 'ioredis';

@Injectable()
export abstract class RedisService extends Commander implements Transaction {
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

  abstract multi(options: { pipeline: false }): Promise<'OK'>;
  abstract multi(): ChainableCommander;
  abstract multi(options: { pipeline: true }): ChainableCommander;
  abstract multi(commands?: unknown[][]): ChainableCommander;
  abstract multi(
    options?: { pipeline: false } | { pipeline: true } | unknown[][],
  ): Promise<'OK'> | ChainableCommander;
  abstract pipeline(commands?: unknown[][]): ChainableCommander;
}
