import { Module } from "@nestjs/common";
import { VideoCommentsService } from "./video-comments.service";
import { VideoCommentsController } from "./video-comments.controller";
import { VideoComment } from "./entities/video-comment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([VideoComment], "nonodoo")],
  controllers: [VideoCommentsController],
  providers: [VideoCommentsService],
  exports: [TypeOrmModule, VideoCommentsService],
})
export class VideoCommentsModule {}
