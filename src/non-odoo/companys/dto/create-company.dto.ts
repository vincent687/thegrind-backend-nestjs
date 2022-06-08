import { Sport } from "src/non-odoo/sports/entities/sport.entity";
import { CompanyUserNonOdoo } from "src/non-odoo/users/entities/company-user.entity";

export class CreateCompanyDto {
  id: number;
  name: string;
  email: string;
  companyInfo: string;
  createdby_user: number;
  establishDate: Date;
  types: Array<Sport>;
  users: number[];
  students: number[];
}
