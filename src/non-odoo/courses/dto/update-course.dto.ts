import { PartialType } from "@nestjs/swagger";
import { CreateCourseDto } from "./create-course.dto";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  id: number;
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
  course_email: string;
}
