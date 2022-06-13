import { Channel } from "src/channels/entities/channel.entity";
import { User } from "src/non-odoo/users/entities/users.entity";
import { Video } from "src/videos/entities/video.entity";
import { LessonTutor } from "../../users/entities/lesson-tutor.entity";
import { LessonStudent } from "../../users/entities/lesson-student";
import { ReadFileDto } from "src/non-odoo/files/dto/read-files.dto";
import { ReadStudent } from "src/non-odoo/users/dto/read-student.dto";
import { Double } from "typeorm";

export class ReadLessonDto {
  id: number;
  name: string;
  created_date: Date;
  createdby_user: number;
  start_date: Date;
  end_date: Date;
  tutors: LessonTutor[];
  students: ReadStudent[];
  location: string;
  description: string;
  course_id: number;
  course_name: string;
  company_id: number;
  videos: ReadFileDto[];
  attendRate: Double;
}
