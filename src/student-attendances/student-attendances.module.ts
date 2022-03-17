import { Module } from "@nestjs/common";
import { StudentAttendancesService } from "./student-attendances.service";
import { StudentAttendancesController } from "./student-attendances.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentAttendance } from "./entities/student-attendance.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StudentAttendance], "odoo")],
  controllers: [StudentAttendancesController],
  providers: [StudentAttendancesService],
  exports: [TypeOrmModule],
})
export class StudentAttendancesModule {}
