import { Course } from "src/non-odoo/courses/entities/course.entity";
import { User } from "../entities/users.entity";

export class ReadTutor {
  cid: number;
  user_id: number;
  course: Course;
  user: User;
  profile: File;
}
