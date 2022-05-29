import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({ name: "public.file_type", synchronize: false })
export class FileType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
