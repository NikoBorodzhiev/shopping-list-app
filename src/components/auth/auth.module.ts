import { Module } from '@nestjs/common';
import { AuthController } from '@controllers';
import { AuthService } from '@providers';
import { UserEntity } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repositories';
import { RedisModule } from '@core';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}