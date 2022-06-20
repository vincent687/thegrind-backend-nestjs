import { forwardRef, Module } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { VideosNonOdooController } from "./video.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "../../files/files.module";

@Module({
  imports: [FilesModule],
  controllers: [VideosNonOdooController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosNonOdooModule {}
