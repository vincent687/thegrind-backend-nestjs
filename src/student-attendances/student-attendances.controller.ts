import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentAttendancesService } from './student-attendances.service';
import { CreateStudentAttendanceDto } from './dto/create-student-attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student-attendance.dto';

@Controller('student-attendances')
export class StudentAttendancesController {
  constructor(private readonly studentAttendancesService: StudentAttendancesService) {}

  @Post()
  create(@Body() createStudentAttendanceDto: CreateStudentAttendanceDto) {
    return this.studentAttendancesService.create(createStudentAttendanceDto);
  }

  @Get()
  findAll() {
    return this.studentAttendancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentAttendancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentAttendanceDto: UpdateStudentAttendanceDto) {
    return this.studentAttendancesService.update(+id, updateStudentAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentAttendancesService.remove(+id);
  }
}
