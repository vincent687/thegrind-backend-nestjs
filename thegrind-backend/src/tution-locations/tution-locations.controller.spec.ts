import { Test, TestingModule } from '@nestjs/testing';
import { TutionLocationsController } from './tution-locations.controller';
import { TutionLocationsService } from './tution-locations.service';

describe('TutionLocationsController', () => {
  let controller: TutionLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutionLocationsController],
      providers: [TutionLocationsService],
    }).compile();

    controller = module.get<TutionLocationsController>(TutionLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
