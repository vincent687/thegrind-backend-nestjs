import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { MyLessonsService } from "./my-lessons.service";
import { CreateMyLessonDto } from "./dto/create-my-lesson.dto";
import { UpdateMyLessonDto } from "./dto/update-my-lesson.dto";
import { PartnersService } from "../partners/partners.service";
import { StudentAttendancesService } from "../student-attendances/student-attendances.service";
import { TutorsService } from "src/tutors/tutors.service";
import { Tutor } from "src/tutors/entities/tutor.entity";
import { ApiTags } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import { ReadTutorDto } from "src/tutors/dto/read-tutor.dto";
import { AttachmentsService } from "src/attachments/attachments.service";
import { ReadEmployeeDto } from "src/employees/dto/read-employee.dto";
import { OutPut } from "../interface/output";

@ApiTags("My Lesson")
@Controller("my-lessons")
export class MyLessonsController {
  constructor(
    private readonly myLessonsService: MyLessonsService,
    private readonly partnersService: PartnersService,
    private readonly studentAttendancesService: StudentAttendancesService,
    private readonly tutorsService: TutorsService,
    private readonly attachmentsService: AttachmentsService
  ) {}

  @Post()
  create(@Body() createMyLessonDto: CreateMyLessonDto) {
    return this.myLessonsService.create(createMyLessonDto);
  }

  @Get()
  findAll() {
    return this.myLessonsService.findAll();
  }

  @Get("/email/:email")
  async getMyLessons(
    @Param("email") email: string,
    @Query("page") page: number,
    @Query("pageSize") pageSize: number
  ) {
    var user = await this.partnersService.findByEmail(email);
    var studentAttdendances =
      await this.studentAttendancesService.getStudentClass(user.id);
    // var result: Tutor[] = [];

    var finalStudentAttdendances = studentAttdendances.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
    var result: OutPut = {
      data: [],
      meta: {
        total: studentAttdendances.length,
      },
    };
    var promise = finalStudentAttdendances.map(async (key, index) => {
      if (key.tutor) {
        Logger.log("id", key.tutor.id);
        var tutor = await this.tutorsService.findOne(+key.tutor.id);
        var tutorFinal = new ReadTutorDto();
        var attachment = await this.attachmentsService.getImageByTable(
          "hr.employee",
          tutor.employee.id
        );
        var attachment2 = await this.attachmentsService.getImageByTable(
          "slide.channel",
          tutor.course.id
        );
        var newEmployee = new ReadEmployeeDto();
        newEmployee = { ...tutor.employee, attachment };
        var newChannel = { ...tutor.course, attachment: attachment2 };
        tutorFinal = { ...tutor, employee: newEmployee, course: newChannel };

        return tutorFinal;
      }
    });
    result.data = await Promise.all(promise);
    return result;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.myLessonsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMyLessonDto: UpdateMyLessonDto
  ) {
    return this.myLessonsService.update(+id, updateMyLessonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.myLessonsService.remove(+id);
  }
}
