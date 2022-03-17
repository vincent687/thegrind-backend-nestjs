import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Company } from "../../companys/entities/company.entity";
import { User } from "./user.entity";

@Entity({ name: "public.res_company_users_rel", synchronize: false })
export class CompanyUser {
  @PrimaryColumn()
  cid: number;
  @PrimaryColumn()
  user_id: number;
  @ManyToOne((type) => Company)
  @JoinColumn({ name: "cid", referencedColumnName: "id" })
  company: Company;
  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
