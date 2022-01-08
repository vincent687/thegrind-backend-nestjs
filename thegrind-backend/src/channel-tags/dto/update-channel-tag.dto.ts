import { PartialType } from '@nestjs/swagger';
import { CreateChannelTagDto } from './create-channel-tag.dto';

export class UpdateChannelTagDto extends PartialType(CreateChannelTagDto) {}
