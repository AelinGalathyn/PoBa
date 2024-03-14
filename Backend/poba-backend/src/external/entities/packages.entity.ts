import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Item } from './item.entity';
import { Users } from '../../users/entities/users.entity';
import { Webshop } from '../../webshop/entities/webshop.entity';

@Entity()
export class Packages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, item => item.packages)
  @JoinColumn({ name: "itemId" })
  item: Item;

  @Column({ type: 'float' })
  qty: number;

  @ManyToOne(() => Webshop)
  @JoinColumn({ name: "id" })
  webshop: Webshop;
}
