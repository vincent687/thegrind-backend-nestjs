import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { StudentAttendancesNonOdooService } from "../student-attendances/student-attendances.service";
import { LessonsNonOdooModule } from "../lessons/lessons.module";
import { LessonsService } from "../lessons/lessons.service";
import { FilesService } from "../files/files.service";
import { UsersService } from "../users/users.service";
import { OutPut } from "src/interface/output";

@ApiTags("Non Odoo Users")
@Controller("courses")
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService,
    private readonly attendanceService: StudentAttendancesNonOdooService,
    private readonly filesService: FilesService,
    private readonly usersService: UsersService
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
      var profile = await this.filesService.findCourseProfile(x.id);
      var todayLessons = await this.lessonsService.findAllByCourseId(x.id);
      todayLessons = todayLessons.filter((o) => this.isToday(o.start_date));

      var tutorsProfiles = [];
      var tutors = await x.tutors.map(async (p) => {
        var file = await this.filesService.findUserProfile(p.user_id);

        if (tutorsProfiles.length < 4 && file != null) {
          tutorsProfiles.push(file.filePath);
        }
        return { ...p, profile: file };
      });

      return {
        ...x,
        profile: profile,
        tutors: await Promise.all(tutors),
        todayLessons: todayLessons ?? [],
        tutorsProfiles: tutorsProfiles,
      };
    });
    var results = await Promise.all(coursesDto);
    return results;
  }
  @Get("/email/:email")
  async getMyLessons(
    @Param("email") email: string,
    @Query("page") page: number,
    @Query("pageSize") pageSize: number
  ) {
    var user = await this.usersService.findByEmail(email);
    var studentAttdendances = await this.coursesService.findAllByUserId(
      user.id
    );
    // var result: Tutor[] = [];

    var finalStudentAttdendances = studentAttdendances.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
    var coursesDto = finalStudentAttdendances.map(async (u) => {
      var profile = await this.filesService.findCourseProfile(u.id);
      var tutorsProfiles = [];
      var tutors = await u.tutors.map(async (p) => {
        var file = await this.filesService.findUserProfile(p.user_id);

        if (tutorsProfiles.length < 4 && file != null) {
          tutorsProfiles.push(file.filePath);
        }
        return { ...p, profile: file };
      });

      return {
        ...u,
        profile: profile,
        tutors: await Promise.all(tutors),
        tutorsProfiles: tutorsProfiles,
      };
    });

    var result: OutPut = {
      data: await Promise.all(coursesDto),
      meta: {
        total: coursesDto.length,
      },
    };
    // var promise = finalStudentAttdendances.map(async (key, index) => {
    //   if (key.tutor) {
    //     Logger.log("id", key.tutor.id);
    //     var tutor = await this.tutorsService.findOne(+key.tutor.id);
    //     var tutorFinal = new ReadTutorDto();
    //     var attachment = await this.attachmentsService.getImageByTable(
    //       "hr.employee",
    //       tutor.employee.id
    //     );
    //     var attachment2 = await this.attachmentsService.getImageByTable(
    //       "slide.channel",
    //       tutor.course.id
    //     );
    //     var newEmployee = new ReadEmployeeDto();
    //     newEmployee = { ...tutor.employee, attachment };
    //     var newChannel = { ...tutor.course, attachment: attachment2 };
    //     tutorFinal = { ...tutor, employee: newEmployee, course: newChannel };

    //     return tutorFinal;
    //   }
    // });
    // result.data = await Promise.all(promise);

    return result;
  }
  @Get(":id")
  async findOne(@Param("id") id: string) {
    var course = await this.coursesService.findOne(+id);
    var students = course.students.map(async (u) => {
      var studentProfile = await this.filesService.findUserProfile(u.user_id);
      return {
        ...u,
        profile: studentProfile,
      };
    });
    var file = await this.filesService.findCourseProfile(+id);

    return {
      ...course,
      students: await Promise.all(students),
      profile: file,
    };
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
