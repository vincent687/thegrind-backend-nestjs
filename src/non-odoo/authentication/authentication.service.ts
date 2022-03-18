import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAuthenticationDto } from "./dto/create-authentication.dto";
import { UpdateAuthenticationDto } from "./dto/update-authentication.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { hash } from "bcrypt";
import { ReadUserDto } from "../users/dto/read-user.dto";
import { RegisterDto } from "./dto/registration.dto";
import {
  PG_UNIQUE_VIOLATION,
  PG_NOT_NULL_VIOLATION,
} from "@fiveem/postgres-error-codes";

@Injectable()
export class AuthenticationService {
  constructor(private readonly UsersService: UsersService) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.UsersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PG_UNIQUE_VIOLATION) {
        throw new HttpException(
          "LoginId already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async getAuthenticatedUser(loginId: string, password: string) {
    try {
      const user = await this.UsersService.getByLoginId(loginId);
      await this.verifyPassword(password, user.password);
      const result: ReadUserDto = { ...user };
      return result;
    } catch (error) {
      // throw new HttpException("Password incorrect", HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException("Password incorrect", HttpStatus.BAD_REQUEST);
    }
  }
}
