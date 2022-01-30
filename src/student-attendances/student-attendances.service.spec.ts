import { Test, TestingModule } from '@nestjs/testing';
import { StudentAttendancesService } from './student-attendances.service';

describe('StudentAttendancesService', () => {
  let service: StudentAttendancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentAttendancesService],
    }).compile();

    service = module.get<StudentAttendancesService>(StudentAttendancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
