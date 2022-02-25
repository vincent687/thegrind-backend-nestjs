import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Partner } from "../../partners/entities/partner.entity";
import { CompanyUser } from "../../users/entities/company-user.entity";

@Entity({ name: "public.res_company", synchronize: false })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @OneToOne(() => Partner)
  @JoinColumn({
    name: "partner_id",
  })
  companyInfo: Partner;
  @OneToMany((type) => CompanyUser, (companyUser) => companyUser.company)
  employees: CompanyUser[];
}
