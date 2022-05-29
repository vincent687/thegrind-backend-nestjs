import { Test, TestingModule } from '@nestjs/testing';
import { VideoCommentsController } from './video-comments.controller';
import { VideoCommentsService } from './video-comments.service';

describe('VideoCommentsController', () => {
  let controller: VideoCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoCommentsController],
      providers: [VideoCommentsService],
    }).compile();

    controller = module.get<VideoCommentsController>(VideoCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
