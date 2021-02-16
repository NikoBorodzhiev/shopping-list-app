import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities';
import { ICreateUser } from '@interfaces';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public createUser(user: ICreateUser): Promise<UserEntity> {
    const created = this.create(user);
    return this.save(created);
  }
}
