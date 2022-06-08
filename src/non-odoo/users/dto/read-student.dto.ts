import { LessonNonOdoo } from "src/non-odoo/lessons/entities/lesson.entity";
import { StudentAttendanceNonOdoo } from "src/non-odoo/student-attendances/entities/student-attendance.entity";
import { User } from "../entities/users.entity";

export class ReadStudent {
  lid: number;
  user_id: number;
  lesson: LessonNonOdoo;
  user: User;
  attendance: StudentAttendanceNonOdoo;
}
