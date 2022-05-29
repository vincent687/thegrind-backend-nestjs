import { Test, TestingModule } from '@nestjs/testing';
import { VideoCommentsService } from './video-comments.service';

describe('VideoCommentsService', () => {
  let service: VideoCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoCommentsService],
    }).compile();

    service = module.get<VideoCommentsService>(VideoCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
