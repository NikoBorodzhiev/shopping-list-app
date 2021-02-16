import { ItemEntity } from '@entities';
import { ICreateItem, IUpdateItem } from '@interfaces';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemsRepository: Repository<ItemEntity>,
  ) {}

  public getAll(): Promise<ItemEntity[]> {
    return this.itemsRepository.find();
  }

  public getById(id: string): Promise<ItemEntity> {
    return this.itemsRepository.findOne(id);
  }

  public create(data: ICreateItem): Promise<ICreateItem & ItemEntity> {
    return this.itemsRepository.save(data);
  }

  public async update(id: string, ownerId: string, data: IUpdateItem): Promise<UpdateResult> {
    await this.checkDataValidityAndReturnItem(id, ownerId);
    return this.itemsRepository.update(id, data);
  }

  public async delete(id: string, ownerId: string): Promise<DeleteResult> {
    await this.checkDataValidityAndReturnItem(id, ownerId);
    return this.itemsRepository.delete(id);
  }

  private async checkDataValidityAndReturnItem(itemId: string, ownerId: string): Promise<ItemEntity> {
    const item = await this.itemsRepository.findOne(itemId);
    if(!item) {
      throw new BadRequestException('Incorrect item id provided.');
    }
    if(item.ownerId !== ownerId) {
      throw new ForbiddenException('You are not owner of this item.');
    }
    return item;
  }
}
