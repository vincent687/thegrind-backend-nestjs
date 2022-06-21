import { Module } from "@nestjs/common";
import { MyCalendarService } from "./my-calendar.service";
import { MyCalendarNonOdooController } from "./my-calendar.controller";
import { LessonsNonOdooModule } from "../lessons/lessons.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule, LessonsNonOdooModule],
  controllers: [MyCalendarNonOdooController],
  providers: [MyCalendarService],
})
export class MyCalendarNonOdooModule {}
