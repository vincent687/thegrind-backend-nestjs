import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { User } from "src/non-odoo/users/entities/users.entity";

dotenv.config();

const ENTITIES = [User];

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
