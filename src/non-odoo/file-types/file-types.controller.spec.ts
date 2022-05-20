import { Test, TestingModule } from '@nestjs/testing';
import { FileTypesController } from './file-types.controller';
import { FileTypesService } from './file-types.service';

describe('FileTypesController', () => {
  let controller: FileTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileTypesController],
      providers: [FileTypesService],
    }).compile();

    controller = module.get<FileTypesController>(FileTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
