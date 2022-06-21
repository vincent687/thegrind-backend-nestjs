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
import { UsersService } from "../users/users.service";
import { StudentAttendancesService } from "src/student-attendances/student-attendances.service";
import { LessonsService } from "../lessons/lessons.service";
import { ApiTags } from "@nestjs/swagger";
import { LessonNonOdoo } from "../lessons/entities/lesson.entity";

@ApiTags("Non Odoo Users")
@Controller("my-calendarNonOdoo")
export class MyCalendarNonOdooController {
  constructor(
    private readonly usersService: UsersService,
    private readonly lessonsService: LessonsService
  ) {}

  @Get("/email/:email")
  async getMyCalendar(@Param("email") email: string) {
    var user = await this.usersService.findByEmail(email);
    var results: LessonNonOdoo[] = await this.lessonsService.findAllByUserId(
      user.id
    );

    // var promise = studentAttdendances.map(async (key, index) => {
    //   if (key.tutor) {
    //     Logger.log("id", key.tutor.id);
    //     var lessons = await this.lessonsService.findAllByClassId(+key.tutor.id);
    //     result.push(...lessons);
    //     return lessons;
    //   }
    // });
    // await Promise.all(promise);
    return results;
  }
}
