import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../../external/entities/item.entity';
import { Orders } from '../../external/entities/orders.entity';
import { Basket } from '../../external/entities/basket.entity';
import { Packages } from '../../external/entities/packages.entity';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  username: string;

  @Column({ length: 45, nullable: true })
  unas_api: string;

  @Column({ length: 45, nullable: true })
  foxpost_api: string;

  @Column({ length: 45, nullable: true })
  gls_api: string;

  @Column({ length: 255, nullable: false })
  password?: string;

  @Column({ length: 255, unique: true })
  shopname: string;

  @OneToMany(() => Item, item => item.user)
  items: Item[];

  @OneToMany(() => Orders, order => order.user)
  orders: Orders[];

  @OneToMany(() => Basket, basket => basket.user)
  baskets: Basket[];

  @OneToMany(() => Packages, packages => packages.user)
  packages: Packages[];
}
