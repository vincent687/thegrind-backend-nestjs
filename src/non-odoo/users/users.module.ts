import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { CompanyUserNonOdoo } from "./entities/company-user.entity";
import { SearchUsersService } from "./searchUsers.service";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [TypeOrmModule.forFeature([User], "nonodoo"), FilesModule],
  controllers: [UsersController],
  providers: [UsersService, SearchUsersService],
  exports: [TypeOrmModule, UsersService, SearchUsersService],
})
export class UsersModule {}
