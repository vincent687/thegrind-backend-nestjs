import { Test, TestingModule } from '@nestjs/testing';
import { MyLessonsController } from './my-lessons.controller';
import { MyLessonsService } from './my-lessons.service';

describe('MyLessonsController', () => {
  let controller: MyLessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyLessonsController],
      providers: [MyLessonsService],
    }).compile();

    controller = module.get<MyLessonsController>(MyLessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
