import { Module } from "@nestjs/common";
import { CompanysService } from "./companys.service";
import { CompanysController } from "./companys.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyNonOdoo } from "./entities/company.entity";
import { CompanyUserNonOdoo } from "../users/entities/company-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyNonOdoo], "nonodoo")],
  controllers: [CompanysController],
  providers: [CompanysService],
  exports: [TypeOrmModule, CompanysService],
})
export class CompanysNonOdooModule {}
