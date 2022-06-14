import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { StudentAttendancesNonOdooService } from "./student-attendances.service";
import { CreateStudentAttendanceDto } from "./dto/create-student-attendance.dto";
import { UpdateStudentAttendanceDto } from "./dto/update-student-attendance.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../authentication/jwt-auth.guard";
import { Logger } from "@nestjs/common";

@ApiTags("Non Odoo Users")
@Controller("student-attendancesNonOdoo")
export class StudentAttendancesController {
  constructor(
    private readonly studentAttendancesNonOdooService: StudentAttendancesNonOdooService
  ) {}

  @Post()
  create(@Body() createStudentAttendanceDto: CreateStudentAttendanceDto) {
    return this.studentAttendancesNonOdooService.create(
      createStudentAttendanceDto
    );
  }

  @Get()
  findAll() {
    return this.studentAttendancesNonOdooService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.studentAttendancesNonOdooService.findOne(+id);
  }

  @Get("/course/:id/student/:sid")
  findAllByCourseId(@Param("id") id: string, @Param("sid") sid: string) {
    return this.studentAttendancesNonOdooService.getStudentClassByCourseId(
      +id,
      +sid
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStudentAttendanceDto: UpdateStudentAttendanceDto
  ) {
    return this.studentAttendancesNonOdooService.update(
      +id,
      updateStudentAttendanceDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("/attendLesson")
  @ApiBearerAuth("JWT-auth")
  updateAttendTheLesson(
    @Req() req: any,
    @Body() updateStudentAttendanceDto: UpdateStudentAttendanceDto
  ) {
    Logger.log(req.user);
    return this.studentAttendancesNonOdooService.updateAttendTheLesson(
      req.user.id,
      updateStudentAttendanceDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.studentAttendancesNonOdooService.remove(+id);
  }
}
