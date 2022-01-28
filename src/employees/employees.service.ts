import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "src/employees/entities/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private EmployeesRepository: Repository<Employee>
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return "This action adds a new employee";
  }

  findAll() {
    return this.EmployeesRepository.createQueryBuilder("employee")
      .leftJoinAndSelect("employee.department", "department")
      .leftJoinAndSelect("department.company", "company")
      .getMany();
  }

  findOne(id: number) {
    return this.EmployeesRepository.createQueryBuilder("employee")
      .leftJoinAndSelect("employee.department", "department")
      .leftJoinAndSelect("department.company", "company")
      .where("employee.id = :id", { id })
      .getOne();
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
