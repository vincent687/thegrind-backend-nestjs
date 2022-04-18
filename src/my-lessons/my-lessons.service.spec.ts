import { Test, TestingModule } from '@nestjs/testing';
import { MyLessonsService } from './my-lessons.service';

describe('MyLessonsService', () => {
  let service: MyLessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLessonsService],
    }).compile();

    service = module.get<MyLessonsService>(MyLessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
