import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, "odoo")
    private UsersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    return this.UsersRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.partner", "partner")
      .leftJoinAndSelect("user.companys", "companyUser")
      .getMany();
  }

  findOne(id: number) {
    return this.UsersRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.partner", "partner")
      .leftJoinAndSelect("user.companys", "companyUser")
      .where("user.id = :id", { id })
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
