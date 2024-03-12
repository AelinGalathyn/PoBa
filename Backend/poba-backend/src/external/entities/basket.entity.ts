import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Orders } from './orders.entity';
import { Item } from './item.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, order => order.baskets)
  @JoinColumn({ name: "orderId" })
  order: Orders;

  @ManyToOne(() => Item, item => item.baskets)
  @JoinColumn({ name: "itemId" })
  item: Item;

  @Column({ type: 'float' })
  qty: number;

  @Column({ type: 'varchar', length: 255 })
  params: string;

  @Column({ type: 'float' })
  net: number;

  @Column({ type: 'float' })
  vatP: number;

  @Column({ type: 'float' })
  gross: number;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userid" })
  user: Users;
}
