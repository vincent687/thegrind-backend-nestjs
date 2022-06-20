import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { VideosService } from "./videos.service";

@ApiTags("Non Odoo Users")
@Controller("/courses/:courseId/videos")
export class VideosNonOdooController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll(@Param("courseId") courseId) {
    return this.videosService.findAll(+courseId);
  }
}
