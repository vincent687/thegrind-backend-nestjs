import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { CompanyNonOdoo } from "../../companys/entities/company.entity";
import { User } from "./users.entity";

@Entity({ name: "company_students_rel", synchronize: false })
export class CompanyStudentNonOdoo {
  @PrimaryColumn()
  cid: number;
  @PrimaryColumn()
  user_id: number;
  @ManyToOne((type) => CompanyNonOdoo, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "cid", referencedColumnName: "id" })
  company: CompanyNonOdoo;
  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
