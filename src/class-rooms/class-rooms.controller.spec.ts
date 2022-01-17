import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoomsController } from './class-rooms.controller';
import { ClassRoomsService } from './class-rooms.service';

describe('ClassRoomsController', () => {
  let controller: ClassRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassRoomsController],
      providers: [ClassRoomsService],
    }).compile();

    controller = module.get<ClassRoomsController>(ClassRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
