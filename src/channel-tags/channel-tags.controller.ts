import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChannelTagsService } from './channel-tags.service';
import { CreateChannelTagDto } from './dto/create-channel-tag.dto';
import { UpdateChannelTagDto } from './dto/update-channel-tag.dto';

@ApiTags('channel-tags')
@Controller('channel-tags')
export class ChannelTagsController {
  constructor(private readonly channelTagsService: ChannelTagsService) {}

  @Post()
  create(@Body() createChannelTagDto: CreateChannelTagDto) {
    return this.channelTagsService.create(createChannelTagDto);
  }

  @Get()
  findAll() {
    return this.channelTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelTagsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChannelTagDto: UpdateChannelTagDto,
  ) {
    return this.channelTagsService.update(+id, updateChannelTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelTagsService.remove(+id);
  }
}
