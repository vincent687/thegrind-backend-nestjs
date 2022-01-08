import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) {}

  create(createChannelDto: CreateChannelDto) {
    return 'This action adds a new channel';
  }

  findAll() {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.channelChannelTags', 'channelChannelTags')
      .leftJoinAndSelect('channelChannelTags.tag', 'channelTags')
      .getMany();
  }

  findOne(id: number) {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.channelChannelTags', 'channelChannelTags')
      .leftJoinAndSelect('channelChannelTags.tag', 'channelTags')
      .where('channel.id = :id', { id })
      .getOne();
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
