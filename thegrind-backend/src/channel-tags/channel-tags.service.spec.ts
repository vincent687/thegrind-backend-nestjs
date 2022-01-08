import { Test, TestingModule } from '@nestjs/testing';
import { ChannelTagsService } from './channel-tags.service';

describe('ChannelTagsService', () => {
  let service: ChannelTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelTagsService],
    }).compile();

    service = module.get<ChannelTagsService>(ChannelTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
