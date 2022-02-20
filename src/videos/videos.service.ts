import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "src/channels/entities/channel.entity";
import { Repository } from "typeorm";
import { CreateVideoDto } from "./dto/create-video.dto";
import { ReadVideoDto } from "./dto/read-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./entities/video.entity";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private VideosRepository: Repository<Video>
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return "This action adds a new video";
  }

  async findAll() {
    let videos = await this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .leftJoinAndSelect("video.channel", "channel")
      .getMany();

    const result: ReadVideoDto[] = videos.map((key, index) => {
      let thumbnail = "";
      if (key.url) {
        if (key.url.includes("youtu.be")) {
          const segemnts = key.url.split("/");
          const last = segemnts.pop() || segemnts.pop();
          thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
        }
      }
      const obj: ReadVideoDto = {
        ...key,
        thumbnail: thumbnail,
      };
      return obj;
    });
    return result;
  }

  async findAllByCourseId(id: number) {
    let videos = await this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .where("video.channel_id = :id", { id })
      .orderBy("video.sequence")
      .getMany();

    const result: ReadVideoDto[] = videos.map((key, index) => {
      let thumbnail = "";
      if (key.url) {
        if (key.url.includes("youtu.be")) {
          const segemnts = key.url.split("/");
          const last = segemnts.pop() || segemnts.pop();
          thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
        }
      }
      const obj: ReadVideoDto = {
        ...key,
        thumbnail: thumbnail,
      };
      return obj;
    });
    return result;
  }

  async findOne(id: number) {
    let video = await this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .leftJoinAndSelect("video.channel", "channel")
      .where("video.id = :id", { id })
      .getOne();

    let thumbnail = "";
    if (video.url) {
      if (video.url.includes("youtu.be")) {
        const segemnts = video.url.split("/");
        const last = segemnts.pop() || segemnts.pop();
        thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
      }
    }

    const obj: ReadVideoDto = {
      ...video,
      thumbnail: thumbnail,
    };
    return obj;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
