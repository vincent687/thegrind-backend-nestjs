import { Test, TestingModule } from '@nestjs/testing';
import { TutionLocationsService } from './tution-locations.service';

describe('TutionLocationsService', () => {
  let service: TutionLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutionLocationsService],
    }).compile();

    service = module.get<TutionLocationsService>(TutionLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
