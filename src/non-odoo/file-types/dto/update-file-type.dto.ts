import { PartialType } from '@nestjs/swagger';
import { CreateFileTypeDto } from './create-file-type.dto';

export class UpdateFileTypeDto extends PartialType(CreateFileTypeDto) {}
