import { ReadAttachmentDto } from "src/attachments/dto/read-attachment.dto";
import { Department } from "src/departments/entities/department.entity";

export class ReadEmployeeDto {
  id: number;
  name: string;
  job_title: string;
  work_email: string;
  department: Department;
  attachment: ReadAttachmentDto;
}
