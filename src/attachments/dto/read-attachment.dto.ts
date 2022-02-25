import { Department } from "src/departments/entities/department.entity";
import { Attachment } from "../../attachments/entities/attachment.entity";

export class ReadAttachmentDto {
  id: number;
  name: string;
  res_model: string;
  res_id: number;
  url: string;
}
