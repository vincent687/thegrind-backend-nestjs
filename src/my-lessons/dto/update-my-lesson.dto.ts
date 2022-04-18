import { PartialType } from '@nestjs/swagger';
import { CreateMyLessonDto } from './create-my-lesson.dto';

export class UpdateMyLessonDto extends PartialType(CreateMyLessonDto) {}
