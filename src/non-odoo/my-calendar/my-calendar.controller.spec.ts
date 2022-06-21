import { Test, TestingModule } from '@nestjs/testing';
import { MyCalendarController } from './my-calendar.controller';
import { MyCalendarService } from './my-calendar.service';

describe('MyCalendarController', () => {
  let controller: MyCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyCalendarController],
      providers: [MyCalendarService],
    }).compile();

    controller = module.get<MyCalendarController>(MyCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
