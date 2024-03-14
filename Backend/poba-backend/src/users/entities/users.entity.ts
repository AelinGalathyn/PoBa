import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Webshop } from '../../webshop/entities/webshop.entity';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  username: string;

  @Column({ length: 255, nullable: false })
  password?: string;

  @OneToMany(() => Webshop, webshop => webshop.user)
  webshops: Webshop[];
}
