import { Channel } from "src/channels/entities/channel.entity";
import { User } from "src/users-odoo/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "public.slide_slide", synchronize: false })
export class Video {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  slide_type: string;
  @Column()
  url: string;
  @Column()
  sequence: number;
  @OneToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  owner: User;
  @OneToOne(() => Channel)
  @JoinColumn({
    name: "channel_id",
  })
  channel: Channel;
}
