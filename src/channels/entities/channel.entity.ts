import { ChannelChannelTag } from 'src/channel-tags/entities/channel-channel-tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'public.slide_channel', synchronize: false })
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  total_time: number;
  @Column()
  description: string;
  @OneToMany(
    (type) => ChannelChannelTag,
    (channelChannelTag) => channelChannelTag.channel,
  )
  channelChannelTags: ChannelChannelTag[];
}
