import { Channel } from "src/channels/entities/channel.entity";
import { ClassRoom } from "src/class-rooms/entities/class-room.entity";
import { ReadEmployeeDto } from "src/employees/dto/read-employee.dto";
import { Partner } from "src/partners/entities/partner.entity";
import { TutionLocation } from "src/tution-locations/entities/tution-location.entity";
import { ReadCompanyUserDto } from "src/users/dto/read-company-user.dto";
import { ReadAttachmentDto } from "../../attachments/dto/read-attachment.dto";

export class ReadTutorDto {
  id: number;
  name: string;
  custom_start_date: Date;
  custom_end_date: Date;
  employee: ReadEmployeeDto;
  class_room: ClassRoom;
  course: Channel;
  custom_present_student: number;
  location: TutionLocation;
}
