import { forwardRef, Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { StudentAttendancesNonOdooModule } from "../student-attendances/student-attendances.module";
import { LessonsNonOdooModule } from "../lessons/lessons.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course], "nonodoo"),
    StudentAttendancesNonOdooModule,
    forwardRef(() => LessonsNonOdooModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [TypeOrmModule, CoursesService],
})
export class CoursesModule {}
