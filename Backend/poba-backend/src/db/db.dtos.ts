import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ length: 45 })
  username: string;

  @Column({ length: 45, nullable: true })
  unas_api: string;

  @Column({ length: 45, nullable: true })
  foxpost_api: string;

  @Column({ length: 45, nullable: true })
  gls_api: string;

  @Column({ length: 10 })
  password: string;
}

@Entity()
export class Order {
  @OneToOne(() => Invoice, invoice => invoice.orderid)
  @OneToMany(() => Basket, basket => basket.orderId)
  @PrimaryColumn({ length: 20 })
  orderId: string;

  @Column()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => Customer, customer => customer.id)
  @Column()
  c_id: number;

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
}

@Entity()
export class Customer {
  @OneToMany(() => Order, order => order.c_id)
  @PrimaryColumn()
  id: number;

  @Column({ length: 50 })
  c_name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 15 })
  c_mobile: string;
}

@Entity()
export class Item {
  @OneToMany(() => Packages, packages => packages.id)
  @OneToMany(() => Basket, basket => basket.itemId)
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Packages, packages => packages.sku)
  @Column({ length: 25, unique: true })
  sku: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'float' })
  qty: number;

  @Column({ length: 50 })
  unit: string;

  @Column({ type: 'float' })
  status: number; // Assuming status is a number based on the image provided.

  @Column({ length: 50 })
  cat_name: string;

  @Column({ length: 100 })
  url: string;
}

@Entity()
export class Invoice {
  @OneToOne(()=> Order, order => order.orderId)
  @PrimaryColumn({ length: 20 })
  orderid: string;

  @Column({ length: 50 })
  i_name: string;

  @Column()
  i_zip: number;

  @Column({ length: 30 })
  i_city: string;

  @Column({ length: 30 })
  i_street: string;

  @Column({ length: 50 })
  i_sname: string;

  @Column({ length: 30 })
  i_stype: string;

  @Column({ length: 20 })
  i_number: string;

  @Column({ length: 30 })
  i_country: string;

  @Column({ length: 10 })
  i_code: string;

  @Column({ length: 10 })
  i_taxan: string;

  @Column({ length: 15 })
  i_eutaxn: string;

  @Column({ length: 50 })
  i_ctype: string;
}

@Entity()
export class Basket {
  @ManyToOne(() => Order, order => order.orderId)
  @PrimaryColumn({ length: 30 })
  orderId: string;

  @ManyToOne(() => Item, item => item.id)
  @Column()
  itemId: number;

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
}

@Entity()
export class Packages {
  @ManyToOne(() => Item, item => item.id)
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Item, item => item.sku)
  @Column({ length: 25 })
  sku: string;

  @Column({ type: 'float' })
  qty: number;
}

@Entity()
export class Shipping {
  @PrimaryColumn({ length: 20 })
  orderid: string;

  @Column({ length: 50 })
  p_id: string;

  @Column({ length: 50 })
  sh_name: string;

  @Column()
  sh_zip: number;

  @Column({ length: 50 })
  sh_city: string;

  @Column({ length: 50 })
  sh_street: string;

  @Column({ length: 50 })
  sh_sname: string;

  @Column({ length: 50 })
  sh_stype: string;

  @Column({ length: 50 })
  sh_number: string;

  @Column({ length: 50 })
  sh_country: string;

  @Column({ length: 50 })
  sh_county: string;

  @Column({ length: 50 })
  sh_ccode: string;

  @Column({ length: 50 })
  dp_id: string;

  @Column({ length: 50 })
  dp_gr: string;

  @Column({ length: 50 })
  dp_recip: string;
}