import { Module } from "@nestjs/common";
import { MyCalendarService } from "./my-calendar.service";
import { MyCalendarController } from "./my-calendar.controller";
import { StudentAttendancesModule } from "src/student-attendances/student-attendances.module";
import { PartnersModule } from "src/partners/partners.module";
import { LessonsModule } from "../lessons/lessons.module";

@Module({
  imports: [PartnersModule, StudentAttendancesModule, LessonsModule],
  controllers: [MyCalendarController],
  providers: [MyCalendarService],
})
export class MyCalendarModule {}
