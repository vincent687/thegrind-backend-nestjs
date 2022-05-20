import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({ name: "file_type", synchronize: false })
export class FileType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
