import { LessonNonOdoo } from "src/non-odoo/lessons/entities/lesson.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity({ name: "lesson_students_rel", synchronize: false })
export class LessonStudent {
  @PrimaryColumn()
  lid: number;
  @PrimaryColumn()
  user_id: number;
  @ManyToOne((type) => LessonNonOdoo, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "lid", referencedColumnName: "id" })
  lesson: LessonNonOdoo;
  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
