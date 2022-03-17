import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { Department } from "./entities/department.entity";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department, "odoo")
    private DepartmentsRepository: Repository<Department>
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return "This action adds a new department";
  }

  findAll() {
    return this.DepartmentsRepository.createQueryBuilder("department")
      .leftJoinAndSelect("department.company", "company")
      .getMany();
  }

  findOne(id: number) {
    return this.DepartmentsRepository.createQueryBuilder("department")
      .leftJoinAndSelect("department.company", "company")
      .where("department.id = :id", { id })
      .getOne();
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
