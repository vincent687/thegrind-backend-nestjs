import { User } from "src/non-odoo/users/entities/users.entity";
import { Video } from "src/videos/entities/video.entity";

export class CreateLessonDto {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  location: string;
  description: string;
  course_id: number;
  company_id: number;
  createdby_user: number;
  tutors: number[];
  students: number[];
}
