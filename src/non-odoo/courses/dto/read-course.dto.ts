import { LessonNonOdoo } from "src/non-odoo/lessons/entities/lesson.entity";
import { CourseTag } from "src/non-odoo/tags/entities/course-tag.entity";
import { ReadTutor } from "src/non-odoo/users/dto/read-tutor.dto";
import { CourseStudent } from "src/non-odoo/users/entities/course-student.entity";
import { CourseTutor } from "src/non-odoo/users/entities/course-tutor.entity";

export class ReadCourseDto {
  id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  createdby_user: number;
  created_date: Date;
  course_email: string;
  companyId: number;
  tutors: ReadTutor[];
  students: CourseStudent[];
  courseTags: CourseTag[];
  todayLesson: LessonNonOdoo[];
  tutorProfiles: string[];
  profile: File;
}
