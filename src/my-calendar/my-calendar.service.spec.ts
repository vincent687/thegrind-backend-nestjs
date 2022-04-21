import { Test, TestingModule } from '@nestjs/testing';
import { MyCalendarService } from './my-calendar.service';

describe('MyCalendarService', () => {
  let service: MyCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyCalendarService],
    }).compile();

    service = module.get<MyCalendarService>(MyCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
