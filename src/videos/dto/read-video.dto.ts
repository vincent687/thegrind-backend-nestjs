import { Channel } from "src/channels/entities/channel.entity";
import { User } from "src/users/entities/user.entity";

export class ReadVideoDto {
  id: number;
  name: string;
  description: string;
  slide_type: string;
  url: string;
  thumbnail: string;
  sequence: number;
  owner: User;
  channel: Channel;
  section: string;
}
