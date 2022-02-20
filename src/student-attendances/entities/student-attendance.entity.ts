import { Partner } from 'src/partners/entities/partner.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, } from 'typeorm';

@Entity({ name: 'public.custom_student_attendance', synchronize: false })
export class StudentAttendance {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  partner_id: number;
  @OneToOne(() => Partner)
  @JoinColumn({
    name: "partner_id",
  })
  partner: Partner;
  @OneToOne(() => Tutor)
  @JoinColumn({
    name: "custom_class_id",
  })
  tutor: Tutor;
}

