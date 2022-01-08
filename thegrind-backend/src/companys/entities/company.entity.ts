import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.res_company', synchronize: false })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
}
