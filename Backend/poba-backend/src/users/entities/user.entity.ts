import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
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

  @Column({ length: 255, nullable: false })
  password: string;
}