import { PartialType } from "@nestjs/swagger";
import { CreateUserGroupDto } from "./create-user-group.dto";

export class UpdateUserGroupDto extends PartialType(CreateUserGroupDto) {}
