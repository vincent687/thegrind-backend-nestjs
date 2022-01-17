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
import { ClassRoomsModule } from './class-rooms/class-rooms.module';
import { TutionLocationsModule } from './tution-locations/tution-locations.module';
import { TutionLocationsService } from './tution-locations/tution-locations.service';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsService } from './departments/departments.service';
import { CompanysModule } from './companys/companys.module';
import { CompanysService } from './companys/companys.service';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsService } from './channels/channels.service';
import { ChannelTagsModule } from './channel-tags/channel-tags.module';
import { ChannelTagsService } from './channel-tags/channel-tags.service';
import { VideosModule } from './videos/videos.module';
import { VideosService } from './videos/videos.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PartnersModule,
    LessonsModule,
    TutorsModule,
    EmployeesModule,
    ClassRoomsModule,
    TutionLocationsModule,
    DepartmentsModule,
    CompanysModule,
    ChannelsModule,
    ChannelTagsModule,
    VideosModule,
    UsersModule,
  ],
  controllers: [AppController],
  //providers: [AppService, PartnersService],
  providers: [
    AppService,
    PartnersService,
    LessonsService,
    TutorsService,
    EmployeesService,
    TutionLocationsService,
    DepartmentsService,
    CompanysService,
    ChannelsService,
    ChannelTagsService,
    VideosService,
    UsersService,
  ],
})
export class AppModule {}
