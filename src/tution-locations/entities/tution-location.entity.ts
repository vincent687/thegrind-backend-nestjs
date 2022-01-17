import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.custom_tution_locations', synchronize: false })
export class TutionLocation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
