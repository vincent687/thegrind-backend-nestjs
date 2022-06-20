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
import { UsersService } from "./users.service";
import { FilesService } from "../files/files.service";

@Injectable()
export class SearchUsersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService
  ) {}

  async searchAllUsers() {
    let users = await this.usersService.findAll();
    let results = users.map(async (u) => {
      let profile = await this.filesService.findUserProfile(u.id);
      return {
        ...u,
        profile: profile,
      };
    });
    return await Promise.all(results);
  }
}
