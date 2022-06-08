import { Module } from "@nestjs/common";
import { StudentAttendancesNonOdooService } from "./student-attendances.service";
import { StudentAttendancesController } from "./student-attendances.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentAttendanceNonOdoo } from "./entities/student-attendance.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StudentAttendanceNonOdoo], "nonodoo")],
  controllers: [StudentAttendancesController],
  providers: [StudentAttendancesNonOdooService],
  exports: [TypeOrmModule, StudentAttendancesNonOdooService],
})
export class StudentAttendancesNonOdooModule {}
