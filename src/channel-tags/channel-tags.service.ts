import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateChannelTagDto } from "./dto/create-channel-tag.dto";
import { UpdateChannelTagDto } from "./dto/update-channel-tag.dto";
import { ChannelTag } from "./entities/channel-tag.entity";

@Injectable()
export class ChannelTagsService {
  constructor(
    @InjectRepository(ChannelTag)
    private ChannelTagsRepository: Repository<ChannelTag>
  ) {}

  create(createChannelTagDto: CreateChannelTagDto) {
    return "This action adds a new channelTag";
  }

  findAll() {
    return this.ChannelTagsRepository.find();
  }

  findOne(id: number) {
    return this.ChannelTagsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateChannelTagDto: UpdateChannelTagDto) {
    return `This action updates a #${id} channelTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelTag`;
  }
}
