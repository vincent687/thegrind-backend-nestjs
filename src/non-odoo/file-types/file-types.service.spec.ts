import { Test, TestingModule } from '@nestjs/testing';
import { FileTypesService } from './file-types.service';

describe('FileTypesService', () => {
  let service: FileTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileTypesService],
    }).compile();

    service = module.get<FileTypesService>(FileTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
