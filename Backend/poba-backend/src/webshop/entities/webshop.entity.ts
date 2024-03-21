import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { ApiCalls } from '../../external/entities/apicalls.entity';

@Entity()
export class Webshop{
  @PrimaryGeneratedColumn()
  webshopid: number;

  @ManyToOne(() => Users)
  @JoinColumn({name: "userid"})
  user: Users;

  @Column({unique: true})
  unas_api: string;

  @Column({unique: true, nullable: true})
  foxpost_api: string;

  @Column({unique: true, nullable: true})
  gls_api: string;

  @Column({nullable: true})
  unas_token: string;

  @OneToMany(() => ApiCalls, apicalls => apicalls.webshop)
  apicalls: ApiCalls[];
}