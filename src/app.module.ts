import { Module } from '@nestjs/common';
import { DatabaseModule, RedisModule } from '@core';
import {
  AuthModule,
  ListsModule,
  UsersModule,
  ItemsModule,
} from '@modules';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    RedisModule,
    ListsModule,
    ItemsModule,
  ],
})
export class AppModule {}
