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
import { LessonStudent } from "./lesson-student";
import { LessonTutor } from "./lesson-tutor.entity";

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
  @Column()
  description: string;
  @Column()
  phoneNo: string;
  @Column({
    type: "jsonb",
    array: false,
    default: () => "'{}'",
    nullable: true,
  })
  statistic: string;
  @OneToMany((type) => CompanyUserNonOdoo, (companyUser) => companyUser.user)
  @JoinColumn()
  companys: CompanyUserNonOdoo[];
  @OneToMany((type) => CourseTutor, (courseUser) => courseUser.user)
  @JoinColumn()
  courses: CourseTutor[];
  @OneToMany((type) => LessonTutor, (lessonUser) => lessonUser.user)
  @JoinColumn()
  lessons: LessonTutor[];
  @OneToMany((type) => CourseStudent, (courseUser) => courseUser.user)
  @JoinColumn()
  studentCourses: CourseStudent[];
  @OneToMany((type) => LessonStudent, (lessonUser) => lessonUser.user)
  @JoinColumn()
  studentLessons: LessonStudent[];
}
