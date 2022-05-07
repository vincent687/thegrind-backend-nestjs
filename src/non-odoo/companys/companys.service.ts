import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CompanyNonOdoo } from "./entities/company.entity";

@Injectable()
export class CompanysService {
  constructor(
    @InjectRepository(CompanyNonOdoo, "nonodoo")
    private CompanysRepository: Repository<CompanyNonOdoo>
  ) {}

  async create(createCompanyDt: CreateCompanyDto) {
    const newCompany = await this.CompanysRepository.create(createCompanyDt);
    await this.CompanysRepository.save(newCompany);
    return newCompany;
  }

  findAll() {
    return this.CompanysRepository.createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "companyUser")
      .leftJoinAndSelect("companyUser.user", "user")
      .getMany();
  }

  async findOne(id: number) {
    return this.CompanysRepository.createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "companyUser")
      .leftJoinAndSelect("companyUser.user", "user")
      .where("company.id = :id ", { id })
      .getOne();
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
