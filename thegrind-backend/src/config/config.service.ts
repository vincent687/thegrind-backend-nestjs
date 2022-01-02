import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Partner } from '../partners/entities/partner.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Tutor } from '../tutors/entities/tutor.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Channel } from '../channels/entities/channel.entity';
import { ClassRoom } from '../class-rooms/entities/class-room.entity';
import { TutionLocation } from '../tution-locations/entities/tution-location.entity';

require('dotenv').config();

const ALL_ENTITIES = [
  Partner,
  Lesson,
  Tutor,
  Employee,
  Channel,
  ClassRoom,
  TutionLocation,
];

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
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
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ALL_ENTITIES,

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
