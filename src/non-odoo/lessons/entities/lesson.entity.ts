import { Channel } from "src/channels/entities/channel.entity";
import { LessonStudent } from "src/non-odoo/users/entities/lesson-student";
import { LessonTutor } from "src/non-odoo/users/entities/lesson-tutor.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

@Entity({ name: "public.lesson", synchronize: false })
export class LessonNonOdoo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: "timestamp" })
  created_date: Date;
  @Column()
  createdby_user: number;
  @Column({ type: "timestamp" })
  start_date: Date;
  @Column({ type: "timestamp" })
  end_date: Date;
  @OneToMany((type) => LessonTutor, (lessonUser) => lessonUser.lesson, {
    cascade: ["insert", "update"],
  })
  tutors: LessonTutor[];
  @OneToMany((type) => LessonStudent, (lessonUser) => lessonUser.lesson, {
    cascade: ["insert", "update"],
  })
  students: LessonStudent[];
  @Column()
  location: string;
  @Column()
  company_id: number;
  @Column()
  description: string;
  @Column()
  course_id: number;
}
