import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/companys/entities/company.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/users.entity";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CompanyNonOdoo } from "./entities/company.entity";
import { UsersService } from "../users/users.service";
import { ReadUserDto } from "../users/dto/read-user.dto";
@Injectable()
export class CompanysService {
  constructor(
    @InjectRepository(CompanyNonOdoo, "nonodoo")
    private CompanysRepository: Repository<CompanyNonOdoo>,
    private readonly UsersService: UsersService
  ) {}

  async create(createCompanyDt: CreateCompanyDto) {
    const company = {
      name: createCompanyDt.name,
      email: createCompanyDt.email,
      companyInfo: createCompanyDt.companyInfo,
      establishDate: createCompanyDt.establishDate,
      types: createCompanyDt.types,
    };
    const newCompany = await this.CompanysRepository.create(company);
    Logger.log(newCompany.id);
    const useArray = await createCompanyDt.users.reduce((acc, val) => {
      return acc.concat({
        cid: newCompany.id,
        user_id: val,
      });
    }, []);

    let entity2 = {
      ...newCompany,
      users: useArray,
    };
    Logger.log(entity2);
    await this.CompanysRepository.save(entity2);
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
