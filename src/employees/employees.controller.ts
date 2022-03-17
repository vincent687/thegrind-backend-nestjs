import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { ApiTags } from "@nestjs/swagger";
import { AttachmentsService } from "src/attachments/attachments.service";

@ApiTags("Employee")
@Controller("employees")
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly attachmentsService: AttachmentsService
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }
}
