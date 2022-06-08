import { Test, TestingModule } from '@nestjs/testing';
import { StudentAttendancesController } from './student-attendances.controller';
import { StudentAttendancesService } from './student-attendances.service';

describe('StudentAttendancesController', () => {
  let controller: StudentAttendancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentAttendancesController],
      providers: [StudentAttendancesService],
    }).compile();

    controller = module.get<StudentAttendancesController>(StudentAttendancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
