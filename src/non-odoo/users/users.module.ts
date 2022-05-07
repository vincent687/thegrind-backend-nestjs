import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { CompanyUserNonOdoo } from "./entities/company-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User], "nonodoo")],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
