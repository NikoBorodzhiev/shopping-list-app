import { UserEntity } from '@entities';
import { ICreateUser } from '@interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}

  public createUser(data: ICreateUser): Promise<UserEntity> {
    return this.usersRepository.createUser(data);
  }
}