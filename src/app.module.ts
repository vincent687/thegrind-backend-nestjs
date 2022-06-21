import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PartnersController } from "./partners/partners.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnersModule } from "./partners/partners.module";
import { PartnersService } from "./partners/partners.service";
// import { configService, ConfigService } from "./config/config.service";
import { LessonsModule } from "./lessons/lessons.module";
import { LessonsService } from "./lessons/lessons.service";
import { TutorsModule } from "./tutors/tutors.module";
import { TutorsService } from "./tutors/tutors.service";
import { EmployeesModule } from "./employees/employees.module";
import { EmployeesService } from "./employees/employees.service";
import { ClassRoomsModule } from "./class-rooms/class-rooms.module";
import { TutionLocationsModule } from "./tution-locations/tution-locations.module";
import { TutionLocationsService } from "./tution-locations/tution-locations.service";
import { DepartmentsModule } from "./departments/departments.module";
import { DepartmentsService } from "./departments/departments.service";
import { CompanysModule } from "./companys/companys.module";
import { CompanysService } from "./companys/companys.service";
import { ChannelsModule } from "./channels/channels.module";
import { ChannelsService } from "./channels/channels.service";
import { ChannelTagsModule } from "./channel-tags/channel-tags.module";
import { ChannelTagsService } from "./channel-tags/channel-tags.service";
import { VideosModule } from "./videos/videos.module";
import { VideosService } from "./videos/videos.service";
import { UsersModule as UsersOdooMoudle } from "./users-odoo/users.module";
import { UsersService as UsersOdooService } from "./users-odoo/users.service";
import { MessagesModule } from "./messages/messages.module";
import { MessagesService } from "./messages/messages.service";
import { AttachmentsModule } from "./attachments/attachments.module";
import { AttachmentsService } from "./attachments/attachments.service";
import { StudentAttendancesModule } from "./student-attendances/student-attendances.module";
import { StudentAttendancesService } from "./student-attendances/student-attendances.service";
import { UsersModule } from "./non-odoo/users/users.module";
import { UsersService } from "./non-odoo/users/users.service";
import { AuthenticationModule } from "./non-odoo/authentication/authentication.module";
import { AuthenticationService } from "./non-odoo/authentication/authentication.service";
import { GcpStorageModule } from "./provider/gcpStorageProvider.module";
import { StorageModule } from "./non-odoo/storage/storage.module";
import { StorageService } from "./non-odoo/storage/storage.service";
import { ConfigModule } from "./config/config.module";
import { ConfigService, configService } from "./config/config.service";
import { FilesModule } from "./non-odoo/files/files.module";
import { FilesService } from "./non-odoo/files/files.service";
import { MyLessonsModule } from "./my-lessons/my-lessons.module";
import { MyCalendarModule } from "./my-calendar/my-calendar.module";
import { CompanysNonOdooModule } from "./non-odoo/companys/companys.module";
import { SportsModule } from "./non-odoo/sports/sports.module";
import { SportsService } from "./non-odoo/sports/sports.service";
import { CoursesModule } from "./non-odoo/courses/courses.module";
import { TagsModule } from "./non-odoo/tags/tags.module";
import { TagsService } from "./non-odoo/tags/tags.service";
import { FileTypesModule } from "./non-odoo/file-types/file-types.module";
import { FileTypesService } from "./non-odoo/file-types/file-types.service";
import { JwtModule } from "@nestjs/jwt";
import { LessonsNonOdooModule } from "./non-odoo/lessons/lessons.module";
import { VideoCommentsModule } from "./non-odoo/video-comments/video-comments.module";
import { StudentAttendancesNonOdooModule } from "./non-odoo/student-attendances/student-attendances.module";
import { VideosNonOdooModule } from "./non-odoo/courses/video/videos.module";
import { MyCalendarNonOdooModule } from "./non-odoo/my-calendar/my-calendar.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getOdooTypeOrmConfig()),
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
    UsersOdooMoudle,
    MessagesModule,
    AttachmentsModule,
    StudentAttendancesModule,
    UsersModule,
    AuthenticationModule,
    StorageModule,
    // ConfigModule,
    ConfigModule,
    GcpStorageModule,
    FilesModule,
    MyLessonsModule,
    MyCalendarModule,
    CompanysNonOdooModule,
    SportsModule,
    CoursesModule,
    TagsModule,
    FileTypesModule,
    JwtModule,
    LessonsNonOdooModule,
    VideoCommentsModule,
    StudentAttendancesNonOdooModule,
    VideosNonOdooModule,
    MyCalendarNonOdooModule,
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
    UsersOdooService,
    MessagesService,
    AttachmentsService,
    StudentAttendancesService,
    UsersService,
    AuthenticationService,
    StorageService,
    ConfigService,
    FilesService,
    SportsService,
    TagsService,
    //ConfigService,
  ],
})
export class AppModule {}
