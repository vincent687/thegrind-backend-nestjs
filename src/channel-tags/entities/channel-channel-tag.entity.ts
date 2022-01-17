import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Channel } from '../../channels/entities/channel.entity';
import { ChannelTag } from './channel-tag.entity';

@Entity({ name: 'public.slide_channel_tag_rel', synchronize: false })
export class ChannelChannelTag {
  @PrimaryColumn()
  channel_id: number;
  @PrimaryColumn()
  tag_id: number;
  @ManyToOne((type) => Channel)
  @JoinColumn({ name: 'channel_id', referencedColumnName: 'id' })
  channel: Channel;
  @ManyToOne((type) => ChannelTag)
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
  tag: ChannelTag;
}
