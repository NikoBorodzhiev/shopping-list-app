import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
