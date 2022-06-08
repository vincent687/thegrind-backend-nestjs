export class CreateStudentAttendanceDto {
  id: number;
  user_id: number;
  lesson_id: number;
  status: string;
  custom_status: string;
  create_date: Date;
}
