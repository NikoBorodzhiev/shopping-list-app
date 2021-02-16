import { Module } from '@nestjs/common';
import { ListsController } from '@controllers';
import { ListsService } from '@providers';
import { ListEntity } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}