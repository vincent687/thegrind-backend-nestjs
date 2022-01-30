import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, } from 'typeorm';

@Entity({ name: 'public.custom_student_attendance', synchronize: false })
export class StudentAttendance {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  partner_id: number;
  @Column()
  custom_class_id: number;
}

