import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';
import CONFIG from '@config';

const { HOST, PORT } = CONFIG.REDIS;

@Injectable()
export class RedisService {
  private client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient({
      host: HOST,
      port: PORT,
    });
  }

  public async get(key: string): Promise<string | null> {
    const get = promisify(this.client.get).bind(this.client);
    return get(key);
  }

  public async set(key: string, value: string): Promise<unknown> {
    const set = promisify(this.client.set).bind(this.client);
    return set(key, value);
  }

  public async setEx(
    key: string,
    seconds: number,
    value: string,
  ): Promise<string> {
    const setex = promisify(this.client.setex).bind(this.client);
    return setex(key, seconds, value);
  }

  public async del(key: string): Promise<number> {
    const del = promisify(this.client.del).bind(this.client);
    return del(key);
  }
}
