import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Users } from '../../users/entities/users.entity';


@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  sh_name: string;

  // Other shipping details...

  @ManyToOne(() => Orders)
  @JoinColumn({ name: "orderId" })
  order: Orders;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userid" })
  user: Users;
}
