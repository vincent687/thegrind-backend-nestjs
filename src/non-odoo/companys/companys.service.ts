import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

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

  async create(createCompanyDto: CreateCompanyDto) {
    const company = {
      name: createCompanyDto.name,
      email: createCompanyDto.email,
      companyInfo: createCompanyDto.companyInfo,
      establishDate: createCompanyDto.establishDate,
      createdby_user: createCompanyDto.createdby_user,
      types: createCompanyDto.types,
    };

    await this.CompanysRepository.createQueryBuilder()
      .insert()
      .into(CompanyNonOdoo)
      .values([company])
      .returning("id")
      .execute();

    const newCompany = await this.CompanysRepository.create(company);
    Logger.log(newCompany.id);
    const userArray =
      createCompanyDto.users != null
        ? await createCompanyDto.users.reduce((acc, val) => {
            return acc.concat({
              cid: newCompany.id,
              user_id: val,
            });
          }, [])
        : [];
    const studentArray =
      createCompanyDto.students != null
        ? await createCompanyDto.students.reduce((acc, val) => {
            return acc.concat({
              cid: newCompany.id,
              user_id: val,
            });
          }, [])
        : [];
    let entity2 = {
      ...newCompany,
      users: userArray,
      students: studentArray,
    };
    Logger.log(entity2);
    await this.CompanysRepository.save(entity2);
    return newCompany;
  }

  findAll(id: number) {
    return this.CompanysRepository.createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "companyUser")
      .leftJoinAndSelect("companyUser.user", "tutor")
      .leftJoinAndSelect("company.students", "companyStudent")
      .leftJoinAndSelect("companyStudent.user", "student")
      .where("tutor.id = :id ", { id })
      .getMany();
  }

  async findOne(id: number) {
    return this.CompanysRepository.createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "companyUser")
      .leftJoinAndSelect("companyUser.user", "tutor")
      .leftJoinAndSelect("company.students", "companyStudent")
      .leftJoinAndSelect("companyStudent.user", "student")
      .where("company.id = :id ", { id })
      .getOne();
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = {
      id: updateCompanyDto.id,
      name: updateCompanyDto.name,
      email: updateCompanyDto.email,
      companyInfo: updateCompanyDto.companyInfo,
      establishDate: updateCompanyDto.establishDate,
      createdby_user: updateCompanyDto.createdby_user,
      types: updateCompanyDto.types,
    };

    // var originalStudents =
    //   await this.CompanysRepository.createQueryBuilder(
    //     "company"
    //   )
    //     .where("company.id = :id ", { lessonId })
    //     .getMany();
    // var oStudents = originalStudents.map((x) => x.user_id);
    // Logger.log(oStudents);
    // var dropStudents = originalStudents.filter(
    //   (x) => !students.includes(x.user_id)
    // );

    const userArray =
      updateCompanyDto.users != null
        ? await updateCompanyDto.users.reduce((acc, val) => {
            return acc.concat({
              cid: company.id,
              user_id: val,
            });
          }, [])
        : [];
    const studentArray =
      updateCompanyDto.students != null
        ? await updateCompanyDto.students.reduce((acc, val) => {
            return acc.concat({
              cid: company.id,
              user_id: val,
            });
          }, [])
        : [];

    let entity2 = {
      ...company,
      users: userArray,
      students: studentArray,
    };
    Logger.log(entity2);
    await this.CompanysRepository.save(entity2);

    return entity2;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
