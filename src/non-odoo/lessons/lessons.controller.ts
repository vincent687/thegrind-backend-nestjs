import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { ApiTags } from "@nestjs/swagger";
import { LessonNonOdoo } from "./entities/lesson.entity";
import { ReadLessonDto } from "./dto/read-lesson.dto";
import { FilesService } from "../files/files.service";
import { StudentAttendancesNonOdooService } from "../student-attendances/student-attendances.service";
import { CoursesService } from "../courses/courses.service";

@ApiTags("Non Odoo Users")
@Controller("lessonsNonOdoo")
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly filesService: FilesService,
    private readonly attendanceService: StudentAttendancesNonOdooService,
    private readonly courseService: CoursesService
  ) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    var course = await this.courseService.findOne(createLessonDto.course_id);
    var students = course.students.map((u) => u.user_id);
    createLessonDto.students = students;
    var result = await this.lessonsService.create(createLessonDto);
    await this.attendanceService.updateByStudentTable(result.id, students);
    return result;
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Query("courseId") courseId: string) {
    var lesson = await this.lessonsService.findOne(+id, +courseId);
    var materials = await this.filesService.findAllLessonMaterial(lesson.id);
    var course = await this.courseService.findOne(lesson.course_id);
    var countAbscense = 0;
    var studentsPromise = lesson.students.map(async (u) => {
      var attendance = await this.attendanceService.getStudentClassByLessonId(
        lesson.id,
        u.user_id
      );
      if (attendance.status != "attend") {
        countAbscense++;
      }

      return {
        ...u,
        attendance,
      };
    });

    var students = await Promise.all(studentsPromise);

    const attendRate =
      ((students.length - countAbscense) / students.length) * 100;

    const result: ReadLessonDto = {
      ...lesson,
      course_name: course.name,
      videos: materials,
      students: students,
      attendRate: attendRate,
    };
    return result;
  }

  @Get("/company/:id")
  async findAllByCompanyId(@Param("id") id: string) {
    var lessons = await this.lessonsService.findAllByCompanyId(+id);
    Logger.log("lesson", lessons);
    var lessonsDto = lessons.map(async (u) => {
      var course = await this.courseService.findOneWithoutTag(u.course_id);
      var countAbscense = 0;

      var studentsPromise = u.students.map(async (x) => {
        var attendance = await this.attendanceService.getStudentClassByLessonId(
          u.id,
          x.user_id
        );

        if (attendance.status != "attend") {
          countAbscense++;
        }
        return {
          ...x,
          attendance,
        };
      });
      var students = await Promise.all(studentsPromise);
      const test = students.length - countAbscense;

      const attendRate =
        ((students.length - countAbscense) / students.length) * 100;
      const result: ReadLessonDto = {
        ...u,
        course_name: course.name,
        videos: [],
        students: students,
        attendRate: attendRate,
      };
      return result;
    });
    var result1 = await Promise.all(lessonsDto);
    var result = result1.reduce(function (r, a) {
      r[a.course_name] = r[a.course_name] || [];
      r[a.course_name].push(a);
      return r;
    }, Object.create(null));

    return result;
  }

  @Get("/class/:id")
  async findAllByClassId(@Param("id") id: string) {
    return this.lessonsService.findAllByCourseId(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateLessonDto: UpdateLessonDto
  ) {
    var result = this.lessonsService.update(+id, updateLessonDto);
    Logger.log("start attendance");
    await this.attendanceService.updateByStudentTable(
      updateLessonDto.id,
      updateLessonDto.students
    );
    return result;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.lessonsService.remove(+id);
  }
}
