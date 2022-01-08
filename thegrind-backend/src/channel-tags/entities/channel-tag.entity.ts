import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ChannelChannelTag } from './channel-channel-tag.entity';

@Entity({ name: 'public.slide_channel_tag', synchronize: false })
export class ChannelTag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(
    (type) => ChannelChannelTag,
    (channelChannelTag) => channelChannelTag.tag,
  )
  @JoinColumn()
  channelChannelTags: ChannelChannelTag[];
}
