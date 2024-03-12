import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Orders } from './orders.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  i_name: string;

  @Column()
  i_zip: number;

  @Column({ length: 30 })
  i_city: string;

  // Other invoice details...

  @OneToOne(() => Orders, orders => orders.invoice)
  @JoinColumn({ name: "orderId" })
  order: Orders;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userid" })
  user: Users;
}
