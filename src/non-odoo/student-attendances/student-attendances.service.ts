import { Injectable, Logger } from "@nestjs/common";
import { CreateStudentAttendanceDto } from "./dto/create-student-attendance.dto";
import { UpdateStudentAttendanceDto } from "./dto/update-student-attendance.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentAttendanceNonOdoo } from "./entities/student-attendance.entity";

@Injectable()
export class StudentAttendancesNonOdooService {
  constructor(
    @InjectRepository(StudentAttendanceNonOdoo, "nonodoo")
    private StudentAttendancesRepository: Repository<StudentAttendanceNonOdoo>
  ) {}

  async create(createStudentAttendanceDto: CreateStudentAttendanceDto) {
    const attendance = {
      user_id: createStudentAttendanceDto.user_id,
      create_date: new Date(),
      custom_status: createStudentAttendanceDto.custom_status,
      lesson_id: createStudentAttendanceDto.lesson_id,
      status: createStudentAttendanceDto.status,
    };

    await this.StudentAttendancesRepository.createQueryBuilder()
      .insert()
      .into(StudentAttendanceNonOdoo)
      .values([attendance])
      .returning("id")
      .execute();
    const newAttendance = await this.StudentAttendancesRepository.create(
      attendance
    );

    await this.StudentAttendancesRepository.save(attendance);
    return newAttendance;
  }

  findAll() {
    return this.StudentAttendancesRepository.find();
  }

  getStudentClassByLessonId(lessonId: number, studentId: number) {
    return this.StudentAttendancesRepository.createQueryBuilder(
      "studentAttendance"
    )
      .where(
        "studentAttendance.lesson_id = :lessonId and studentAttendance.user_id = :studentId",
        { lessonId, studentId }
      )
      .getOne();
  }

  getStudentClassByCourseId(courseId: number, studentId: number) {
    return this.StudentAttendancesRepository.createQueryBuilder(
      "studentAttendance"
    )
      .leftJoinAndSelect("studentAttendance.lesson", "lesson")
      .where(
        "lesson.course_id = :courseId and studentAttendance.user_id = :studentId",
        { courseId, studentId }
      )
      .getMany();
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
      .where("studentAttendance.id = :id", { id })
      .getOne();
  }

  async updateByStudentTable(lessonId: number, students: number[]) {
    var originalStudents =
      await this.StudentAttendancesRepository.createQueryBuilder(
        "studentAttendance"
      )
        .where("studentAttendance.lesson_id = :lessonId ", { lessonId })
        .getMany();
    var oStudents = originalStudents.map((x) => x.user_id);
    Logger.log(oStudents);
    var dropStudents = originalStudents.filter(
      (x) => !students.includes(x.user_id)
    );

    var newStudents = students.filter((x) => !oStudents.includes(x));
    Logger.log("new", newStudents);
    var dropIds = dropStudents.map((x) => x.id);
    Logger.log(dropIds);
    const entities = await this.StudentAttendancesRepository.findByIds(dropIds);
    Logger.log(entities);
    if (entities) {
      this.StudentAttendancesRepository.remove(entities);
    }
    newStudents.map((x) => {
      var newStudent: CreateStudentAttendanceDto = {
        id: 0,
        user_id: x,
        lesson_id: lessonId,
        status: "absence",
        custom_status: "absence",
        create_date: new Date(),
      };
      this.create(newStudent);
    });
  }

  async update(
    id: number,
    updateStudentAttendanceDto: UpdateStudentAttendanceDto
  ) {
    const attendance = {
      id: updateStudentAttendanceDto.id,
      user_id: updateStudentAttendanceDto.user_id,
      create_date: new Date(),
      custom_status: updateStudentAttendanceDto.custom_status,
      lesson_id: updateStudentAttendanceDto.lesson_id,
      status: updateStudentAttendanceDto.status,
    };

    await this.StudentAttendancesRepository.save(attendance);

    return attendance;
  }

  async updateAttendTheLesson(
    updateUserId: number,
    updateStudentAttendanceDto: UpdateStudentAttendanceDto
  ) {
    const { lesson_id, user_id } = updateStudentAttendanceDto;

    var originalAttendance =
      await this.StudentAttendancesRepository.createQueryBuilder(
        "studentAttendance"
      )
        .where(
          "studentAttendance.lesson_id = :lesson_id and studentAttendance.user_id = :user_id",
          { lesson_id, user_id }
        )
        .getOne();

    Logger.log("oattend", originalAttendance);
    const attendance = {
      id: originalAttendance.id,
      user_id: user_id,
      create_date: new Date(),
      custom_status: updateStudentAttendanceDto.custom_status,
      lesson_id: updateStudentAttendanceDto.lesson_id,
      status: updateStudentAttendanceDto.status,
    };

    await this.StudentAttendancesRepository.save(attendance);

    return attendance;
  }

  remove(id: number) {
    return `This action removes a #${id} studentAttendance`;
  }
}
