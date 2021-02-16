import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity, ItemEntity } from '@entities';

@Entity('lists')
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'name',
    type: 'text'
  })
  public name: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  public userId: string;

  @ManyToOne(() => UserEntity, user => user.lists)
  @JoinColumn({ name: 'user_id'})
  public user: UserEntity;

  @ManyToMany(() => ItemEntity, item => item.lists)
  @JoinTable({
    name: 'items_lists',
    joinColumn: {
      name: 'list_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'item_id',
      referencedColumnName: 'id',
    },
  })
  public items?: ItemEntity[]; 
}