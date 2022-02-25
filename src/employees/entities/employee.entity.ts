import { Company } from "src/companys/entities/company.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Department } from "../../departments/entities/department.entity";

@Entity({ name: "public.hr_employee", synchronize: false })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  job_title: string;
  @Column()
  work_email: string;
  @OneToOne(() => Company)
  @JoinColumn({
    name: "company_id",
  })
  company: Company;
  @OneToOne(() => Department)
  @JoinColumn({
    name: "department_id",
  })
  department: Department;
}
