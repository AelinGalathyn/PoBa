import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Orders } from './orders.entity';
import { Webshop } from '../../webshop/entities/webshop.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  c_name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 15 })
  c_mobile: string;

  @ManyToOne(() => Webshop)
  @JoinColumn({ name: "webshopid" })
  webshop: Webshop;

  @OneToMany(() => Orders, order => order.customer)
  orders: Orders[];
}
