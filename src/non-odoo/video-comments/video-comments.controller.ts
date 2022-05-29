import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VideoCommentsService } from "./video-comments.service";
import { CreateVideoCommentDto } from "./dto/create-video-comment.dto";
import { UpdateVideoCommentDto } from "./dto/update-video-comment.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Non Odoo Users")
@Controller("video-comments")
export class VideoCommentsController {
  constructor(private readonly videoCommentsService: VideoCommentsService) {}

  @Post()
  create(@Body() createVideoCommentDto: CreateVideoCommentDto) {
    return this.videoCommentsService.create(createVideoCommentDto);
  }

  @Get()
  findAll() {
    return this.videoCommentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videoCommentsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVideoCommentDto: UpdateVideoCommentDto
  ) {
    return this.videoCommentsService.update(+id, updateVideoCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videoCommentsService.remove(+id);
  }
}
