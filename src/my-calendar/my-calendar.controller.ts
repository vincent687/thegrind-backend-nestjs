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
import { MyCalendarService } from "./my-calendar.service";
import { CreateMyCalendarDto } from "./dto/create-my-calendar.dto";
import { UpdateMyCalendarDto } from "./dto/update-my-calendar.dto";
import { PartnersService } from "src/partners/partners.service";
import { StudentAttendancesService } from "src/student-attendances/student-attendances.service";
import { LessonsService } from "src/lessons/lessons.service";
import { ApiTags } from "@nestjs/swagger";
import { Lesson } from "../lessons/entities/lesson.entity";

@ApiTags("My Calendar")
@Controller("my-calendar")
export class MyCalendarController {
  constructor(
    private readonly partnersService: PartnersService,
    private readonly myCalendarService: MyCalendarService,
    private readonly studentAttendancesService: StudentAttendancesService,
    private readonly lessonsService: LessonsService
  ) {}

  @Post()
  create(@Body() createMyCalendarDto: CreateMyCalendarDto) {
    return this.myCalendarService.create(createMyCalendarDto);
  }

  @Get()
  findAll() {
    return this.myCalendarService.findAll();
  }
  @Get("/email/:email")
  async getMyCalendar(@Param("email") email: string) {
    var user = await this.partnersService.findByEmail(email);
    var studentAttdendances =
      await this.studentAttendancesService.getStudentClass(user.id);
    var result: Lesson[] = [];

    var promise = studentAttdendances.map(async (key, index) => {
      if (key.tutor) {
        Logger.log("id", key.tutor.id);
        var lessons = await this.lessonsService.findAllByClassId(+key.tutor.id);
        result.push(...lessons);
        return lessons;
      }
    });
    await Promise.all(promise);
    return result;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.myCalendarService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMyCalendarDto: UpdateMyCalendarDto
  ) {
    return this.myCalendarService.update(+id, updateMyCalendarDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.myCalendarService.remove(+id);
  }
}
