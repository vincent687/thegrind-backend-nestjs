import { Module } from "@nestjs/common";
import { CompanysService } from "./companys.service";
import { CompanysController } from "./companys.controller";
import { Company } from "./entities/company.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttachmentsModule } from "../attachments/attachments.module";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AttachmentsModule],
  controllers: [CompanysController],
  providers: [CompanysService],
  exports: [TypeOrmModule],
})
export class CompanysModule {}
