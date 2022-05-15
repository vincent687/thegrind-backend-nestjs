import { Sport } from "src/non-odoo/sports/entities/sport.entity";
import { CompanyUserNonOdoo } from "src/non-odoo/users/entities/company-user.entity";

export class CreateCompanyDto {
  name: string;
  email: string;
  companyInfo: string;
  establishDate: Date;
  types: Array<Sport>;
  users: number[];
}
