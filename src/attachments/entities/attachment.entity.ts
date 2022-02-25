import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "public.ir_attachment", synchronize: false })
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  res_model: string;
  @Column()
  res_id: number;
}
