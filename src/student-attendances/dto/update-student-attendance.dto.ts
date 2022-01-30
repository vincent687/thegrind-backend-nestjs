import { PartialType } from '@nestjs/swagger';
import { CreateStudentAttendanceDto } from './create-student-attendance.dto';

export class UpdateStudentAttendanceDto extends PartialType(CreateStudentAttendanceDto) {}
