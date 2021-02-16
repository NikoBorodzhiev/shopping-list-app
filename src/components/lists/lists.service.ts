import { ListEntity } from '@entities';
import { ICreateList, IUpdateList } from '@interfaces';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listsRepository: Repository<ListEntity>,
  ) {}

  public getAll(userId: string): Promise<ListEntity[]> {
    return this.listsRepository.find({ where: { userId }});
  }

  public async getById(id: string, userId: string): Promise<ListEntity> {
    return this.checkDataValidityAndReturnList(id, userId);
  }

  public create(data: ICreateList): Promise<ICreateList & ListEntity> {
    return this.listsRepository.save(data);
  }

  public async update(id: string, userId: string, data: IUpdateList): Promise<UpdateResult> {
    await this.checkDataValidityAndReturnList(id, userId);
    return this.listsRepository.update(id, data);
  }

  public async delete(id: string, userId: string): Promise<DeleteResult> {
    await this.checkDataValidityAndReturnList(id, userId);
    return this.listsRepository.delete({ id, userId });
  }

  public async addItemToList(listId: string, itemId: string, userId: string) {
    await this.checkDataValidityAndReturnList(listId, userId);
    return getConnection()
      .query(`INSERT INTO "items_lists" VALUES($1, $2);`, [listId, itemId]);
  }

  public async deleteItemFromList(listId: string, itemId: string, userId: string) {
    await this.checkDataValidityAndReturnList(listId, userId);
    return getConnection()
      .query(`DELETE FROM "items_lists" WHERE list_id = $1 AND item_id = $2;`, [listId, itemId]);
  }

  private async checkDataValidityAndReturnList(listId: string, userId: string): Promise<ListEntity> {
    const list = await this.listsRepository.findOne(listId, { relations: ['items']});
    if(!list) {
      throw new BadRequestException('Incorrect list id provided.');
    }
    if(list.userId !== userId) {
      throw new ForbiddenException('You are not owner of this list.');
    }
    return list;
  }
}
