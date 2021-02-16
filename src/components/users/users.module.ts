import { UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@controllers';
import { UserRepository } from '@repositories';
import { UsersService } from '@providers';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}