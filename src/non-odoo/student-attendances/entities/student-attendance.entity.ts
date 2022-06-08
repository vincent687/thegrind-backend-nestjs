import { User } from "src/non-odoo/users/entities/users.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { LessonNonOdoo } from "../../lessons/entities/lesson.entity";

@Entity({ name: "public.student_attendances", synchronize: false })
export class StudentAttendanceNonOdoo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column()
  lesson_id: number;
  @Column()
  status: string;
  @Column()
  custom_status: string;
  @Column()
  create_date: Date;
  @OneToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user: User;
  @OneToOne(() => LessonNonOdoo)
  @JoinColumn({
    name: "lesson_id",
  })
  lesson: LessonNonOdoo;
}
