import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CourseTag } from "./course-tag.entity";

@Entity({ name: "tag", synchronize: false })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany((type) => CourseTag, (courseTag) => courseTag.tag)
  @JoinColumn()
  courseTags: CourseTag[];
}
