import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { Users } from '../../users/entities/users.entity';
import { Invoice } from './invoice.entity';
import { Basket } from './basket.entity';
import { Webshop } from '../../webshop/entities/webshop.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  date: Date;

  @Column({ length: 50 })
  type: string;

  @Column()
  status_id: number;

  @Column({ length: 50 })
  p_status: string;

  @Column()
  p_id: number;

  @Column({ type: 'float' })
  payment: number;

  @Column({ type: 'float' })
  weight: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @ManyToOne(() => Webshop)
  @JoinColumn({ name: "id" })
  webshop: Webshop;

  @OneToOne(() => Invoice, invoice => invoice.order)
  invoice: Invoice;

  @OneToMany(() => Basket, basket => basket.order)
  baskets: Basket[];
}
