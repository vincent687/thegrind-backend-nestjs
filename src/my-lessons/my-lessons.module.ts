import { Module } from "@nestjs/common";
import { MyLessonsService } from "./my-lessons.service";
import { MyLessonsController } from "./my-lessons.controller";
import { PartnersModule } from "src/partners/partners.module";
import { StudentAttendancesModule } from "../student-attendances/student-attendances.module";
import { TutorsModule } from "../tutors/tutors.module";
import { AttachmentsModule } from "../attachments/attachments.module";

@Module({
  imports: [
    PartnersModule,
    StudentAttendancesModule,
    TutorsModule,
    AttachmentsModule,
  ],
  controllers: [MyLessonsController],
  providers: [MyLessonsService],
})
export class MyLessonsModule {}
