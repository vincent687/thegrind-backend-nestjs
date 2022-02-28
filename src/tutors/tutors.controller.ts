import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TutorsService } from "./tutors.service";
import { CreateTutorDto } from "./dto/create-tutor.dto";
import { UpdateTutorDto } from "./dto/update-tutor.dto";
import { ApiTags } from "@nestjs/swagger";
import { ReadTutorDto } from "./dto/read-tutor.dto";
import { ReadEmployeeDto } from "src/employees/dto/read-employee.dto";
import { AttachmentsService } from "src/attachments/attachments.service";
import { Channel } from "../channels/entities/channel.entity";

@ApiTags("Tutors")
@Controller("tutors")
export class TutorsController {
  constructor(
    private readonly tutorsService: TutorsService,
    private readonly attachmentsService: AttachmentsService
  ) {}

  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsService.create(createTutorDto);
  }

  @Get()
  async findAll() {
    // return this.tutorsService.findAll();
    var tutors = await this.tutorsService.findAll();
    var tutorsFinal: ReadTutorDto[] = [];
    for (var i = 0; i < tutors.length; i++) {
      var tutorFinal = new ReadTutorDto();
      var attachment = await this.attachmentsService.getImageByTable(
        "hr.employee",
        tutors[i].employee.id
      );
      var attachment2 = await this.attachmentsService.getImageByTable(
        "slide.channel",
        tutors[i].course.id
      );
      var newEmployee = { ...tutors[i].employee, attachment };
      var newChannel = { ...tutors[i].course, attachment: attachment2 };
      tutorFinal = { ...tutors[i], employee: newEmployee, course: newChannel };

      tutorsFinal.push(tutorFinal);
    }
    return tutorsFinal;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    // return this.tutorsService.findOne(+id);
    var tutor = await this.tutorsService.findOne(+id);

    var tutorFinal = new ReadTutorDto();
    var attachment = await this.attachmentsService.getImageByTable(
      "hr.employee",
      tutor.employee.id
    );
    var attachment2 = await this.attachmentsService.getImageByTable(
      "slide.channel",
      tutor.course.id
    );
    var newEmployee = new ReadEmployeeDto();
    newEmployee = { ...tutor.employee, attachment };
    var newChannel = { ...tutor.course, attachment: attachment2 };
    tutorFinal = { ...tutor, employee: newEmployee, course: newChannel };

    return tutorFinal;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorsService.update(+id, updateTutorDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tutorsService.remove(+id);
  }
}
