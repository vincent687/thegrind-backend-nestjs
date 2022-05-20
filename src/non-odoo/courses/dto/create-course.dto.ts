import { CourseTag } from "src/non-odoo/tags/entities/course-tag.entity";
import { CourseStudent } from "src/non-odoo/users/entities/course-student.entity";
import { CourseTutor } from "src/non-odoo/users/entities/course-tutor.entity";

export class CreateCourseDto {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  createdby_user: number;
  created_date: Date;
  tutors: number[];
  students: number[];
  courseTags: number[];
  companyId: number;
}
