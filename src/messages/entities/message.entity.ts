import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.mail_message', synchronize: false })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  body: string;
  @Column()
  res_id: number;
  @Column()
  record_name: string;
  @Column()
  write_uid: number; //user_id
  @Column()
  write_date: Date;
}
