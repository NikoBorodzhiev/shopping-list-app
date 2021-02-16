import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ListEntity, UserEntity } from '@entities';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'name',
    type: 'text',
  })
  public name: string;

  @Column({
    name: 'price',
    type: 'float',
  })
  public price: number;

  @Column({
    name: 'owner_id',
    type: 'uuid',
  })
  public ownerId: string;

  @ManyToOne(() => UserEntity, user => user.items)
  @JoinColumn({ name: 'owner_id' })
  public owner: UserEntity;

  @ManyToMany(() => ListEntity, list => list.items)
  public lists: ListEntity[];
}