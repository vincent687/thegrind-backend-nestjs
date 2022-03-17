import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "src/channels/entities/channel.entity";
import { Repository } from "typeorm";
import { URLSearchParams } from "url";
import { CreateVideoDto } from "./dto/create-video.dto";
import { ReadVideoDto } from "./dto/read-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./entities/video.entity";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video, "odoo")
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
        if (key.url.includes("youtube")) {
          const segments = key.url.split("?");
          const query = segments[1];
          const params = new URLSearchParams(query);
          if (params.has("v")) {
            thumbnail = `https://img.youtube.com/vi/${params.get("v")}/0.jpg`;
          }
          // thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
        }
      }
      const obj: ReadVideoDto = {
        ...key,
        thumbnail: thumbnail,
        section: "",
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
          const segments = key.url.split("/");
          const last = segments.pop() || segments.pop();
          thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
        }
        if (key.url.includes("youtube")) {
          const segments = key.url.split("?");
          const query = segments[1];
          const params = new URLSearchParams(query);
          if (params.has("v")) {
            thumbnail = `https://img.youtube.com/vi/${params.get("v")}/0.jpg`;
          }
        }
      }
      const obj: ReadVideoDto = {
        ...key,
        thumbnail: thumbnail,
        section: "",
      };
      return obj;
    });
    return result;
  }
  async findAllOtherVideoWithSectionByCourseId(id: number) {
    let videos = await this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .where("video.channel_id = :id", { id })
      .orderBy("video.sequence")
      .getMany();

    // const finalResult: ReadVideoDto[];
    var currentSection = "";
    const result: ReadVideoDto[] = videos.map((key, index) => {
      if (key.slide_type == "document" && !key.url) {
        currentSection = key.name;
      } else {
        let thumbnail = "";
        if (key.url) {
          if (key.url.includes("youtu.be")) {
            const segments = key.url.split("/");
            const last = segments.pop() || segments.pop();
            thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
          }
          if (key.url.includes("youtube")) {
            const segments = key.url.split("?");
            const query = segments[1];
            const params = new URLSearchParams(query);
            if (params.has("v")) {
              thumbnail = `https://img.youtube.com/vi/${params.get("v")}/0.jpg`;
            }
          }
        }
        const obj: ReadVideoDto = {
          ...key,
          thumbnail: thumbnail,
          section: currentSection,
        };
        return obj;
      }
    });
    return result.filter((u) => u != null);
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
      section: "",
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
