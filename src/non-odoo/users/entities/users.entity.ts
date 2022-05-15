import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { CompanyUserNonOdoo } from "./company-user.entity";
import { CourseTutor } from "./course-tutor.entity";
import { CourseStudent } from "./course-student.entity";

@Entity({ name: "user", synchronize: false })
export class User {
  @Column()
  id: number;
  @PrimaryColumn()
  loginId: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @PrimaryColumn()
  email: string;
  @Column()
  type: string;
  @OneToMany((type) => CompanyUserNonOdoo, (companyUser) => companyUser.user)
  @JoinColumn()
  companys: CompanyUserNonOdoo[];
  @OneToMany((type) => CourseTutor, (courseUser) => courseUser.user)
  @JoinColumn()
  courses: CourseTutor[];
  @OneToMany((type) => CourseStudent, (courseUser) => courseUser.user)
  @JoinColumn()
  studentCourses: CourseStudent[];
}
