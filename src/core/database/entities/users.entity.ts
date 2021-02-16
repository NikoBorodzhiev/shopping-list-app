import { createHash } from '@utils';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListEntity } from '@entities';
import { ItemEntity } from './items.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'name',
    type: 'text',
  })
  public name: string;

  @Column({
    name: 'email',
    type: 'text',
    unique: true
  })
  public email: string;

  @Column({
    name: 'role',
    type: 'text',
  })
  public role: string;

  @Column({
    name: 'password',
    type: 'text',
    select: false,
  })
  public password: string;

  @OneToMany(() => ListEntity, list => list.user)
  public lists?: ListEntity[];

  @OneToMany(() => ItemEntity, item => item.owner)
  public items?: ItemEntity[];

  @BeforeInsert()
  private async encrypt() {
    this.password = await createHash(this.password);
  }
}