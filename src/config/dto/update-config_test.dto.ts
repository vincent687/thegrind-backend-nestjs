import { PartialType } from '@nestjs/swagger';
import { CreateConfigTestDto } from './create-config_test.dto';

export class UpdateConfigTestDto extends PartialType(CreateConfigTestDto) {}
