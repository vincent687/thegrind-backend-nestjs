import { ReadAttachmentDto } from "src/attachments/dto/read-attachment.dto";
import { ChannelChannelTag } from "src/channel-tags/entities/channel-channel-tag.entity";

export class ReadChannelDto {
  id: number;
  name: string;
  total_time: number;
  description: string;
  channelChannelTags: ChannelChannelTag[];
  attachment: ReadAttachmentDto;
}
