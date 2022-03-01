import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VideosService } from "./videos.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Videos")
@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get("/course/:id")
  findAllByCourseId(@Param("id") id: string) {
    return this.videosService.findAllByCourseId(+id);
  }

  @Get("/videoSection/:id")
  findAllOtherVideoWithSectionByCourseId(@Param("id") id: string) {
    return this.videosService.findAllOtherVideoWithSectionByCourseId(+id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videosService.remove(+id);
  }
}
