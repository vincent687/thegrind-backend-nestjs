import { Injectable } from "@nestjs/common";
import { CreateStudentAttendanceDto } from "./dto/create-student-attendance.dto";
import { UpdateStudentAttendanceDto } from "./dto/update-student-attendance.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentAttendance } from "./entities/student-attendance.entity";

@Injectable()
export class StudentAttendancesService {
  constructor(
    @InjectRepository(StudentAttendance, "odoo")
    private StudentAttendancesRepository: Repository<StudentAttendance>
  ) {}

  create(createStudentAttendanceDto: CreateStudentAttendanceDto) {
    return "This action adds a new studentAttendance";
  }

  findAll() {
    return this.StudentAttendancesRepository.find();
  }

  getStudentClass(partnerId: number) {
    return this.StudentAttendancesRepository.createQueryBuilder(
      "studentAttendance"
    )
      .leftJoinAndSelect("studentAttendance.tutor", "tutor")
      .where("studentAttendance.partner_id = :partnerId", { partnerId })
      .getMany();

    // return this.StudentAttendancesRepository.findOne({
    //   where: {
    //     partner_id: partnerId,
    //   },
    // });
  }
  findOne(id: number) {
    return this.StudentAttendancesRepository.createQueryBuilder(
      "studentAttendance"
    )
      .leftJoinAndSelect("studentAttendance.tutor", "tutor")
      .where("studentAttendance.id = :id", { id })
      .getOne();
  }

  update(id: number, updateStudentAttendanceDto: UpdateStudentAttendanceDto) {
    return `This action updates a #${id} studentAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentAttendance`;
  }
}
