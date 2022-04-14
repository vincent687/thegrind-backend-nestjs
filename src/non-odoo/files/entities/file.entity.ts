import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({ name: "file", synchronize: false })
export class File {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  classId: number;
  @Column()
  userId: number;
  @Column()
  type: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  url: string;
  @Column({ nullable: true })
  filePath: string;
  @Column()
  date: Date;
}
