import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.ir_attachement', synchronize: false })
export class File {
  @PrimaryGeneratedColumn()
  id: number;
  // @Column()
  // body: string;
}