import { Test, TestingModule } from '@nestjs/testing';
import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';

describe('TutorsController', () => {
  let controller: TutorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorsController],
      providers: [TutorsService],
    }).compile();

    controller = module.get<TutorsController>(TutorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
