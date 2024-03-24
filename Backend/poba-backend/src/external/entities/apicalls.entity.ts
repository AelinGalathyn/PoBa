import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Webshop } from '../../webshop/entities/webshop.entity';

@Entity()
export class ApiCalls{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Webshop)
  @JoinColumn({name: "webshopid"})
  webshop: Webshop;

  @Column()
  url: string;

  @Column()
  counter: number;
}