import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateVideoCommentDto } from "./dto/create-video-comment.dto";
import { UpdateVideoCommentDto } from "./dto/update-video-comment.dto";
import { VideoComment } from "./entities/video-comment.entity";

@Injectable()
export class VideoCommentsService {
  constructor(
    @InjectRepository(VideoComment, "nonodoo")
    private VideoCommentRepository: Repository<VideoComment>
  ) {}

  create(createVideoCommentDto: CreateVideoCommentDto) {
    return "This action adds a new videoComment";
  }

  findAll() {
    return this.VideoCommentRepository.find();
  }

  async findAllByVideoId(id: number) {
    const comments = await this.VideoCommentRepository.find({
      where: {
        videoId: id,
      },
    });
    return comments;
    // return this.VideoCommentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} videoComment`;
  }

  update(id: number, updateVideoCommentDto: UpdateVideoCommentDto) {
    return `This action updates a #${id} videoComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoComment`;
  }
}
