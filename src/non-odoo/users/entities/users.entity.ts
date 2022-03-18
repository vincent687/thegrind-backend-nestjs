import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({ name: "user", synchronize: false })
export class User {
  @Column()
  id: number;
  @PrimaryColumn()
  loginId: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @PrimaryColumn()
  email: string;
}
