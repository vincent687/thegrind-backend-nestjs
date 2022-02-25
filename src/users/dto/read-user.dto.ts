import { ReadPartnerDto } from "src/partners/dto/read-partner.dto";
import { CompanyUser } from "../entities/company-user.entity";

export class ReadUserDto {
  id: number;
  partner: ReadPartnerDto;
  companys: CompanyUser[];
}
