import { Partner } from "src/partners/entities/partner.entity";
import { ReadCompanyUserDto } from "src/users/dto/read-company-user.dto";
import { ReadAttachmentDto } from "../../attachments/dto/read-attachment.dto";

export class ReadCompanyDto {
  id: number;
  name: string;
  email: string;
  companyInfo: Partner;
  attachment: ReadAttachmentDto;
  employees: ReadCompanyUserDto[];
}
