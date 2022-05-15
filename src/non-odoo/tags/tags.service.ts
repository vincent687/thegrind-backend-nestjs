import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag, "nonodoo")
    private TagsRepository: Repository<Tag>
  ) {}

  async create(createTagDto: CreateTagDto) {
    const newTag = await this.TagsRepository.create(createTagDto);
    await this.TagsRepository.save(newTag);
    return newTag;
  }

  findAll() {
    return this.TagsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
