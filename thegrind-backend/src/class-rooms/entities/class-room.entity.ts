import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.custom_class_rooms', synchronize: false })
export class ClassRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
