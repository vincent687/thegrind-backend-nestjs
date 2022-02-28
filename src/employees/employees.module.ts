import { Module } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { AttachmentsModule } from "src/attachments/attachments.module";

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), AttachmentsModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [TypeOrmModule],
})
export class EmployeesModule {}
