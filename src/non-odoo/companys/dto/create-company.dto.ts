import { Sport } from "src/non-odoo/sports/entities/sport.entity";

export class CreateCompanyDto {
  name: string;
  email: string;
  companyInfo: string;
  establishDate: Date;
  types: Array<Sport>;
}
