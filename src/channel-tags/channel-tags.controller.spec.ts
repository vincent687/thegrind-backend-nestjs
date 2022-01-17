import { Test, TestingModule } from '@nestjs/testing';
import { ChannelTagsController } from './channel-tags.controller';
import { ChannelTagsService } from './channel-tags.service';

describe('ChannelTagsController', () => {
  let controller: ChannelTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelTagsController],
      providers: [ChannelTagsService],
    }).compile();

    controller = module.get<ChannelTagsController>(ChannelTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
