import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PartnersController } from './partners/partners.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersModule } from './partners/partners.module';
import { PartnersService } from './partners/partners.service';
import { configService } from './config/config.service';
import { LessonsModule } from './lessons/lessons.module';
import { LessonsService } from './lessons/lessons.service';
import { TutorsModule } from './tutors/tutors.module';
import { TutorsService } from './tutors/tutors.service';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesService } from './employees/employees.service';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsService } from './channels/channels.service';
import { ClassRoomsModule } from './class-rooms/class-rooms.module';
import { TutionLocationsModule } from './tution-locations/tution-locations.module';
import { TutionLocationsService } from './tution-locations/tution-locations.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PartnersModule,
    LessonsModule,
    TutorsModule,
    EmployeesModule,
    ChannelsModule,
    ClassRoomsModule,
    TutionLocationsModule,
  ],
  controllers: [AppController],
  //providers: [AppService, PartnersService],
  providers: [
    AppService,
    PartnersService,
    LessonsService,
    TutorsService,
    EmployeesService,
    ChannelsService,
    TutionLocationsService,
  ],
})
export class AppModule {}
