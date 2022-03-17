import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTutorDto } from "./dto/create-tutor.dto";
import { UpdateTutorDto } from "./dto/update-tutor.dto";
import { Tutor } from "./entities/tutor.entity";

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor, "odoo")
    private TutorsRepository: Repository<Tutor>
  ) {}

  create(createTutorDto: CreateTutorDto) {
    return "This action adds a new tutor";
  }

  findAll() {
    return this.TutorsRepository.createQueryBuilder("tutor")
      .leftJoinAndSelect("tutor.employee", "employee")
      .leftJoinAndSelect("employee.company", "company")
      .leftJoinAndSelect("tutor.class_room", "class_room")
      .leftJoinAndSelect("tutor.location", "location")
      .leftJoinAndSelect("tutor.course", "course")
      .leftJoinAndSelect("course.channelChannelTags", "channelChannelTags")
      .leftJoinAndSelect("channelChannelTags.tag", "channelTags")
      .getMany();
    //return this.tutorsRepository.find();
  }

  findOne(id: number) {
    return this.TutorsRepository.createQueryBuilder("tutor")
      .leftJoinAndSelect("tutor.employee", "employee")
      .leftJoinAndSelect("employee.company", "company")
      .leftJoinAndSelect("tutor.class_room", "class_room")
      .leftJoinAndSelect("tutor.location", "location")
      .leftJoinAndSelect("tutor.course", "course")
      .leftJoinAndSelect("course.channelChannelTags", "channelChannelTags")
      .leftJoinAndSelect("channelChannelTags.tag", "channelTags")
      .where("tutor.id = :id", { id })
      .getOne();
  }

  update(id: number, updateTutorDto: UpdateTutorDto) {
    return `This action updates a #${id} tutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }
}
