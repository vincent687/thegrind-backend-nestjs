import { Module } from '@nestjs/common';
import { ChannelTagsService } from './channel-tags.service';
import { ChannelTagsController } from './channel-tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelTag } from './entities/channel-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelTag])],
  controllers: [ChannelTagsController],
  providers: [ChannelTagsService],
  exports: [TypeOrmModule],
})
export class ChannelTagsModule {}
