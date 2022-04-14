import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Partner } from "../partners/entities/partner.entity";
import { Lesson } from "../lessons/entities/lesson.entity";
import { Tutor } from "../tutors/entities/tutor.entity";
import { Employee } from "../employees/entities/employee.entity";
import { Channel } from "../channels/entities/channel.entity";
import { ChannelTag } from "../channel-tags/entities/channel-tag.entity";
import { ChannelChannelTag } from "../channel-tags/entities/channel-channel-tag.entity";
import { ClassRoom } from "../class-rooms/entities/class-room.entity";
import { TutionLocation } from "../tution-locations/entities/tution-location.entity";
import { Department } from "../departments/entities/department.entity";
import { Company } from "src/companys/entities/company.entity";
import { Video } from "../videos/entities/video.entity";
import { User as UserOdoo } from "src/users-odoo/entities/user.entity";
import { Message } from "../messages/entities/message.entity";
import { Attachment } from "../attachments/entities/attachment.entity";
import { StudentAttendance } from "../student-attendances/entities/student-attendance.entity";
import { CompanyUser } from "../users-odoo/entities/company-user.entity";
import { User } from "src/non-odoo/users/entities/users.entity";
import { join } from "path";
import { Logger } from "@nestjs/common";
import { File } from "src/non-odoo/files/entities/file.entity";

require("dotenv").config();

const ALL_ENTITIES = [
  Partner,
  Lesson,
  Tutor,
  Employee,
  Channel,
  ClassRoom,
  TutionLocation,
  Department,
  Company,
  ChannelTag,
  ChannelChannelTag,
  Video,
  UserOdoo,
  Message,
  Attachment,
  StudentAttendance,
  CompanyUser,
];

const ENTITIES = [User, File];
export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    Logger.log("key", key);
    const value = this.env[key];
    Logger.log("getvalue", value);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "DEV";
  }

  public getOdooTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      name: "odoo",
      type: "postgres",
      host: this.getValue("ODOO_POSTGRES_HOST"),
      port: parseInt(this.getValue("ODOO_POSTGRES_PORT")),
      username: this.getValue("ODOO_POSTGRES_USER"),
      password: this.getValue("ODOO_POSTGRES_PASSWORD"),
      database: this.getValue("ODOO_POSTGRES_DATABASE"),

      entities: ALL_ENTITIES,

      migrationsTableName: "migration",

      migrations: ["src/migrations/odoo/*.ts"],

      cli: {
        migrationsDir: "src/migrations/odoo",
      },

      ssl: this.isProduction(),
    };
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      name: "nonodoo",
      type: "postgres",
      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DATABASE"),

      entities: ENTITIES,

      migrationsTableName: "migration",

      migrations: [join(__dirname, "..", "migrations/non-odoo/*.{ts,js}")],

      cli: {
        migrationsDir: "src/migrations/non-odoo",
      },

      ssl: this.isProduction(),
    };
  }

  public getGcpStorageConfig() {
    return {
      projectId: this.getValue("PROJECT_ID"),
      bucketName: this.getValue("GCS_BUCKET_NAME"),
      email: this.getValue("CLIENT_EMAIL"),
      key: this.getValue("PRIVATE_KEY"),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
]);

export { configService };
