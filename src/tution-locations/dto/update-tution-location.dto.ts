import { PartialType } from '@nestjs/swagger';
import { CreateTutionLocationDto } from './create-tution-location.dto';

export class UpdateTutionLocationDto extends PartialType(CreateTutionLocationDto) {}
