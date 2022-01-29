import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { VideosModule } from "../videos/videos.module";

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), VideosModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [TypeOrmModule],
})
export class LessonsModule {}
