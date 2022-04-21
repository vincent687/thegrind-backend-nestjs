import { Injectable } from '@nestjs/common';
import { CreateMyCalendarDto } from './dto/create-my-calendar.dto';
import { UpdateMyCalendarDto } from './dto/update-my-calendar.dto';

@Injectable()
export class MyCalendarService {
  create(createMyCalendarDto: CreateMyCalendarDto) {
    return 'This action adds a new myCalendar';
  }

  findAll() {
    return `This action returns all myCalendar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myCalendar`;
  }

  update(id: number, updateMyCalendarDto: UpdateMyCalendarDto) {
    return `This action updates a #${id} myCalendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} myCalendar`;
  }
}
