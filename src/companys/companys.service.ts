import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanysService {
  constructor(
    @InjectRepository(Company)
    private CompanysRepository: Repository<Company>
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return "This action adds a new company";
  }

  findAll() {
    return this.CompanysRepository.createQueryBuilder("company")
      .leftJoinAndSelect("company.companyInfo", "companyInfo")
      .leftJoinAndSelect("company.employees", "companyUser")
      .leftJoinAndSelect("companyUser.user", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .where("user.id != 2")
      .getMany();
  }

  findOne(id: number) {
    return this.CompanysRepository.createQueryBuilder("company")
      .leftJoinAndSelect("company.companyInfo", "companyInfo")
      .leftJoinAndSelect("company.employees", "companyUser")
      .leftJoinAndSelect("companyUser.user", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .where("company.id = :id and user.id != 2", { id })
      .getOne();
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
