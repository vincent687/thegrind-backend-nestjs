import { Injectable } from '@nestjs/common';
import { CreateStudentAttendanceDto } from './dto/create-student-attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAttendance } from './entities/student-attendance.entity';

@Injectable()
export class StudentAttendancesService {
  constructor(
    @InjectRepository(StudentAttendance)
    private StudentAttendancesRepository: Repository<StudentAttendance>,
  ) { }

  create(createStudentAttendanceDto: CreateStudentAttendanceDto) {
    return 'This action adds a new studentAttendance';
  }

  findAll() {
    return this.StudentAttendancesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} studentAttendance`;
  }

  update(id: number, updateStudentAttendanceDto: UpdateStudentAttendanceDto) {
    return `This action updates a #${id} studentAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentAttendance`;
  }
}
