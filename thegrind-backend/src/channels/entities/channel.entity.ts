import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.slide_channel', synchronize: false })
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  total_time: number;
  @Column()
  description: string;
}
