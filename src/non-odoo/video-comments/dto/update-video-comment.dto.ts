import { PartialType } from '@nestjs/swagger';
import { CreateVideoCommentDto } from './create-video-comment.dto';

export class UpdateVideoCommentDto extends PartialType(CreateVideoCommentDto) {}
