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
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
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
    var students = lesson.students.map(async (u) => {
      var attendance = await this.attendanceService.getStudentClassByLessonId(
        lesson.id,
        u.user_id
      );
      return {
        ...u,
        attendance,
      };
    });
    const result: ReadLessonDto = {
      ...lesson,
      course_name: course.name,
      videos: materials,
      students: await Promise.all(students),
    };
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
