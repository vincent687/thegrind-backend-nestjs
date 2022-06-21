import { PartialType } from '@nestjs/swagger';
import { CreateMyCalendarDto } from './create-my-calendar.dto';

export class UpdateMyCalendarDto extends PartialType(CreateMyCalendarDto) {}
