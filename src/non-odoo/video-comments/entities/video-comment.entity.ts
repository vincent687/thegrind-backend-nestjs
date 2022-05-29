import { User } from "src/non-odoo/users/entities/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "public.video_comment", synchronize: false })
export class VideoComment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  videoId: number;
  @OneToOne(() => User)
  @JoinColumn({
    name: "userId",
  })
  user: User;
  @Column()
  content: string;
  @Column()
  created_time: Date;
}
