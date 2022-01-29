import { Channel } from "src/channels/entities/channel.entity";
import { Video } from "src/videos/entities/video.entity";

export class ReadLessonDto {
  id: number;
  name: string;
  custom_create_date: Date;
  custom_deadline_date: Date;
  custom_tutor_id: number;
  custom_class_id: number;
  custom_class_room_id: number;
  custom_company_id: number;
  custom_lession_details: string;
  course: Channel;
  videos: Video[];
}
