import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Partner } from "../../partners/entities/partner.entity";
import { CompanyUser } from "./company-user.entity";

@Entity({ name: "public.res_users", synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Partner)
  @JoinColumn({
    name: "partner_id",
  })
  partner: Partner;
  @OneToMany((type) => CompanyUser, (companyUser) => companyUser.user)
  @JoinColumn()
  companys: CompanyUser[];
}
