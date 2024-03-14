import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../external/entities/item.entity';
import { Orders } from '../../external/entities/orders.entity';
import { Basket } from '../../external/entities/basket.entity';
import { Packages } from '../../external/entities/packages.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Webshop{
  @PrimaryGeneratedColumn()
  webshopid: number;

  @ManyToOne(() => Users)
  @JoinColumn({name: "userid"})
  user: Users;

  @Column({unique: true})
  unas_api: string;

  @Column({unique: true})
  foxpost_api: string;

  @Column({unique: true})
  gls_api: string;

  @Column()
  unas_token: string;

  @OneToMany(() => Item, item => item.webshop)
  items: Item[];

  @OneToMany(() => Orders, order => order.webshop)
  orders: Orders[];

  @OneToMany(() => Basket, basket => basket.webshop)
  baskets: Basket[];

  @OneToMany(() => Packages, packages => packages.webshop)
  packages: Packages[];
}