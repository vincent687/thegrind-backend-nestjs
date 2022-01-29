import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { Lesson } from "./entities/lesson.entity";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private LessonsRepository: Repository<Lesson>
  ) {}

  create(createLessonDto: CreateLessonDto) {
    return "This action adds a new lesson";
  }

  findAll(): Promise<Lesson[]> {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.course", "course")
      .leftJoinAndSelect("course.channelChannelTags", "channelChannelTags")
      .leftJoinAndSelect("channelChannelTags.tag", "channelTags")
      .getMany();
  }

  findVideos() {}

  findOne(id: number) {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.course", "course")
      .leftJoinAndSelect("course.channelChannelTags", "channelChannelTags")
      .leftJoinAndSelect("channelChannelTags.tag", "channelTags")
      .where("lesson.id = :id", { id })
      .getOne();
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
