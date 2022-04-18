import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags("My Lesson")
@Controller("my-lessons")
export class MyLessonsController {
  constructor(
    private readonly myLessonsService: MyLessonsService,
    private readonly partnersService: PartnersService,
    private readonly studentAttendancesService: StudentAttendancesService,
    private readonly tutorsService: TutorsService
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
  async getMyLessons(@Param("email") email: string) {
    var user = await this.partnersService.findByEmail(email);
    var studentAttdendances =
      await this.studentAttendancesService.getStudentClass(user.id);
    // var result: Tutor[] = [];
    var promise = studentAttdendances.map(async (key, index) => {
      if (key.tutor) {
        Logger.log("id", key.tutor.id);
        return await this.tutorsService.findOne(+key.tutor.id);
      }
    });
    return Promise.all(promise);
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
