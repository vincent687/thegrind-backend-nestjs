import { Course } from "src/non-odoo/courses/entities/course.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Tag } from "./tag.entity";

@Entity({ name: "public.course_tags_rel", synchronize: false })
export class CourseTag {
  @PrimaryColumn()
  cid: number;
  @PrimaryColumn()
  tag_id: number;
  @ManyToOne((type) => Course, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "cid", referencedColumnName: "id" })
  course: Course;
  @ManyToOne((type) => Tag, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "tag_id", referencedColumnName: "id" })
  tag: Tag;
}
