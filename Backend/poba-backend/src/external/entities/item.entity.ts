import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Basket } from './basket.entity';
import { Packages } from './packages.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: true })
  sku: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'float' })
  qty: number;

  @Column({ length: 50 })
  unit: string;

  @Column({ type: 'float' })
  status: number;

  @Column({ length: 50 })
  cat_name: string;

  @Column({ length: 100 })
  url: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userid" })
  user: Users;

  @OneToMany(() => Basket, basket => basket.item)
  baskets: Basket[];

  @OneToMany(() => Packages, packages => packages.item)
  packages: Packages[];
}
