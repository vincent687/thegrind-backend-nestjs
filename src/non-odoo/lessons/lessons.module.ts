import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonNonOdoo } from "./entities/lesson.entity";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [TypeOrmModule.forFeature([LessonNonOdoo], "nonodoo"), FilesModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [TypeOrmModule, LessonsService],
})
export class LessonsNonOdooModule {}
