import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "public.user_group", synchronize: false })
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  value: string;
}
