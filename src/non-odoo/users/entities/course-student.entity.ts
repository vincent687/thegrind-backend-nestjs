import { Course } from "src/non-odoo/courses/entities/course.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { CompanyNonOdoo } from "../../companys/entities/company.entity";
import { User } from "./users.entity";

@Entity({ name: "course_students_rel", synchronize: false })
export class CourseStudent {
  @PrimaryColumn()
  cid: number;
  @PrimaryColumn()
  user_id: number;
  @ManyToOne((type) => Course)
  @JoinColumn({ name: "cid", referencedColumnName: "id" })
  course: Course;
  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
