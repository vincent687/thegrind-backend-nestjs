import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoomsService } from './class-rooms.service';

describe('ClassRoomsService', () => {
  let service: ClassRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassRoomsService],
    }).compile();

    service = module.get<ClassRoomsService>(ClassRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
