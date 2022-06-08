import { Sport } from "src/non-odoo/sports/entities/sport.entity";
import { CompanyStudentNonOdoo } from "src/non-odoo/users/entities/company-student.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { CompanyUserNonOdoo } from "../../users/entities/company-user.entity";

@Entity({ name: "company", synchronize: false })
export class CompanyNonOdoo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  companyInfo: string;
  @Column()
  establishDate: Date;
  @Column()
  createdby_user: number;
  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  types: Array<Sport>;
  @OneToMany(
    (type) => CompanyUserNonOdoo,
    (companyUser) => companyUser.company,

    { cascade: ["insert", "update", "remove"] }
  )
  users: CompanyUserNonOdoo[];
  @OneToMany(
    (type) => CompanyStudentNonOdoo,
    (companyStudent) => companyStudent.company,
    { cascade: ["insert", "update", "remove"] }
  )
  students: CompanyStudentNonOdoo[];
}
