import { Module } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { VideosController } from "./videos.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Video], "odoo")],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [TypeOrmModule, VideosService],
})
export class VideosModule {}
