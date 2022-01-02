import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.custom_subject_lession', synchronize: false })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'timestamp' })
  custom_create_date: Date;
  @Column({ type: 'timestamp' })
  custom_deadline_date: Date;
  @Column()
  custom_tutor_id: number;
  @Column()
  custom_class_id: number;
  @Column()
  custom_class_room_id: number;
  @Column()
  custom_courses_id: number;
  @Column()
  custom_company_id: number;
  @Column()
  custom_lesson_details: string;
}
