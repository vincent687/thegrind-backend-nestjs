import { Company } from "../../companys/entities/company.entity";
import { ReadUserDto } from "./read-user.dto";

export class ReadCompanyUserDto {
  cid: number;
  user_id: number;
  company: Company;
  user: ReadUserDto;
}
