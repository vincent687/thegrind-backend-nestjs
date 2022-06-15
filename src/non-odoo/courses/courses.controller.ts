import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { StudentAttendancesNonOdooService } from "../student-attendances/student-attendances.service";
import { LessonsNonOdooModule } from "../lessons/lessons.module";
import { LessonsService } from "../lessons/lessons.service";

@ApiTags("Non Odoo Users")
@Controller("courses")
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService,
    private readonly attendanceService: StudentAttendancesNonOdooService
  ) {}

  isToday(date) {
    const today = new Date();
    // 👇️ Today's date
    console.log(today);
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
    return false;
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get("/company/:id")
  async findAllByCompanyId(@Param("id") id: string) {
    var courses = await this.coursesService.findAllByCompanyId(+id);
    var coursesDto = await courses.map(async (x) => {
      Logger.log("x", x);
      var todayLessons = await this.lessonsService.findAllByCourseId(x.id);
      Logger.log("totdaynofilter", todayLessons);
      todayLessons = todayLessons.filter((o) => this.isToday(o.start_date));
      Logger.log("totday", todayLessons);
      return {
        ...x,
        todayLessons: todayLessons ?? [],
      };
    });
    var results = await Promise.all(coursesDto);
    return results;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    var result = this.coursesService.update(+id, updateCourseDto);
    var lessons = await this.lessonsService.findAllByCourseId(+id);
    lessons.map(async (x) => {
      var newLesson = {
        id: x.id,
        name: x.name,
        created_date: x.created_date,
        createdby_user: x.createdby_user,
        start_date: x.start_date,
        end_date: x.end_date,
        tutors: x.tutors.map((u) => u.user_id),
        students: updateCourseDto.students,
        location: x.location,
        company_id: x.company_id,
        description: x.description,
        course_id: x.course_id,
      };
      await this.lessonsService.update(x.id, newLesson);
      await this.attendanceService.updateByStudentTable(
        x.id,
        updateCourseDto.students
      );
    });
    return result;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coursesService.remove(+id);
  }
}
