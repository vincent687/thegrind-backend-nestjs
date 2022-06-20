import { forwardRef, Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { StudentAttendancesNonOdooModule } from "../student-attendances/student-attendances.module";
import { LessonsNonOdooModule } from "../lessons/lessons.module";
import { FilesModule } from "../files/files.module";
import { UsersModule } from "../users/users.module";
import { CompanysNonOdooModule } from "../companys/companys.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course], "nonodoo"),
    StudentAttendancesNonOdooModule,
    CompanysNonOdooModule,
    FilesModule,
    UsersModule,
    forwardRef(() => LessonsNonOdooModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [TypeOrmModule, CoursesService],
})
export class CoursesModule {}
