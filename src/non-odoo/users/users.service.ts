import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Http2ServerRequest } from "http2";
import { Repository } from "typeorm";
import { CreateUsersDto } from "./dto/create-users.dto";
import { ReadUserDto } from "./dto/read-user.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { User } from "./entities/users.entity";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, "nonodoo")
    private UsersRepository: Repository<User>
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    const newUser = await this.UsersRepository.create(createUsersDto);
    await this.UsersRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return this.UsersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.UsersRepository.findOne({
      where: {
        id: id,
      },
    });
    const result: ReadUserDto = { ...user };

    return result;
  }

  findByEmail(email: string) {
    return this.UsersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateUsersDto: UpdateUsersDto) {
    return this.UsersRepository.createQueryBuilder()
      .update(User)
      .set({
        email: updateUsersDto.email,
        description: updateUsersDto.description,
        phoneNo: updateUsersDto.phoneNo,
      })
      .where("id = :id", { id: id })
      .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} usersFront`;
  }

  async checkUserExistById(loginId: string) {
    const userById = await this.UsersRepository.findOne({ loginId });
    if (userById) {
      return true;
    } else {
      return false;
    }
  }
  async checkUserExistByEmail(email: string) {
    const userByEmail = await this.UsersRepository.findOne({ email });
    if (userByEmail) {
      return true;
    } else {
      return false;
    }
  }
  async getByLoginId(loginId: string) {
    const user = await this.UsersRepository.findOne({ loginId });
    if (user) {
      return user;
    }
    throw new HttpException(
      "User with this loginId does not exist",
      HttpStatus.NOT_FOUND
    );
  }
}
