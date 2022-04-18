import { Module } from "@nestjs/common";
import { TutorsService } from "./tutors.service";
import { TutorsController } from "./tutors.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tutor } from "./entities/tutor.entity";
import { AttachmentsModule } from "src/attachments/attachments.module";

@Module({
  imports: [TypeOrmModule.forFeature([Tutor], "odoo"), AttachmentsModule],
  controllers: [TutorsController],
  providers: [TutorsService],
  exports: [TypeOrmModule, TutorsService],
})
export class TutorsModule {}
