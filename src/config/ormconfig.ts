import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { User } from "src/non-odoo/users/entities/users.entity";
import { File } from "src/non-odoo/files/entities/file.entity";
import { Sport } from "src/non-odoo/sports/entities/sport.entity";
import { CompanyNonOdoo } from "src/non-odoo/companys/entities/company.entity";
import { CompanyUserNonOdoo } from "src/non-odoo/users/entities/company-user.entity";
import { Tag } from "../non-odoo/tags/entities/tag.entity";
import { CourseTutor } from "../non-odoo/users/entities/course-tutor.entity";
import { CourseStudent } from "../non-odoo/users/entities/course-student.entity";
import { Course } from "src/non-odoo/courses/entities/course.entity";
import { CourseTag } from "src/non-odoo/tags/entities/course-tag.entity";
import { FileType } from "src/non-odoo/file-types/entities/file-type.entity";
import { LessonTutor } from "src/non-odoo/users/entities/lesson-tutor.entity";
import { LessonStudent } from "src/non-odoo/users/entities/lesson-student";
import { LessonNonOdoo } from "src/non-odoo/lessons/entities/lesson.entity";

dotenv.config();

const ENTITIES = [
  User,
  File,
  Sport,
  CompanyNonOdoo,
  CompanyUserNonOdoo,
  Tag,
  Course,
  CourseTag,
  CourseStudent,
  CourseTutor,
  FileType,
  LessonNonOdoo,
  LessonTutor,
  LessonStudent,
];

dotenv.config();

export = [
  {
    name: "default",
    // name: "nonodoo",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ENTITIES,

    migrationsTableName: "migration",

    migrations: [join(__dirname, "..", "migrations/non-odoo/*.{ts,js}")],

    cli: {
      migrationsDir: "src/migrations/non-odoo",
    },
  } as TypeOrmModuleOptions,
];
