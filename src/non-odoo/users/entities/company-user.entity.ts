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

@Entity({ name: "company_users_rel", synchronize: false })
export class CompanyUserNonOdoo {
  @PrimaryColumn()
  cid: number;
  @PrimaryColumn()
  user_id: number;
  @ManyToOne((type) => CompanyNonOdoo)
  @JoinColumn({ name: "cid", referencedColumnName: "id" })
  company: CompanyNonOdoo;
  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
