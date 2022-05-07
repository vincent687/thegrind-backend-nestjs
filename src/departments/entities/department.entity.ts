import { Company } from "src/companys/entities/company.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "public.hr_department", synchronize: false })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToOne(() => Company)
  @JoinColumn({
    name: "company_id",
  })
  company: Company;
}
