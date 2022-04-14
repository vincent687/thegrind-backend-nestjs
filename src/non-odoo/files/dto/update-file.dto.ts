import { PartialType } from "@nestjs/swagger";
import { CreateFilesDto } from "./create-files.dto";

export class UpdateFileDto extends PartialType(CreateFilesDto) {}
