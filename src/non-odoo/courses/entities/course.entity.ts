import { CourseTag } from "src/non-odoo/tags/entities/course-tag.entity";
import { CompanyUserNonOdoo } from "src/non-odoo/users/entities/company-user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseStudent } from "../../users/entities/course-student.entity";
import { CourseTutor } from "../../users/entities/course-tutor.entity";

@Entity({ name: "course", synchronize: false })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column()
  location: string;
  @Column()
  createdby_user: number;
  @Column()
  created_date: Date;
  @Column()
  course_email: string;
  @Column()
  companyId: number;
  @OneToMany((type) => CourseTutor, (courseUser) => courseUser.course, {
    cascade: ["insert", "update", "remove"],
  })
  tutors: CourseTutor[];
  @OneToMany((type) => CourseStudent, (courseUser) => courseUser.course, {
    cascade: ["insert", "update", "remove"],
  })
  students: CourseStudent[];
  @OneToMany((type) => CourseTag, (courseTag) => courseTag.course, {
    cascade: ["insert", "update", "remove"],
  })
  courseTags: CourseTag[];
}
