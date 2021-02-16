import { Module } from '@nestjs/common';
import { ItemsController } from '@controllers';
import { ItemsService } from '@providers';
import { ItemEntity } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}