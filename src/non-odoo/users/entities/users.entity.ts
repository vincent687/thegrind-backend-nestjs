import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user", synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  loginId: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column()
  email: string;
}
