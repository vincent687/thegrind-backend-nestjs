import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../authentication/jwt-auth.guard";
import { Logger } from "@nestjs/common";
import { UserGroupsService } from "./user-groups.service";
import { CreateUserGroupDto } from "./dto/create-user-group.dto";
import { UpdateUserGroupDto } from "./dto/update-user-group.dto";

@ApiTags("Non Odoo Users")
@Controller("user-groups")
export class UserGroupsController {
  constructor(private readonly userGroupsService: UserGroupsService) {}

  @Post()
  create(@Body() createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupsService.create(createUserGroupDto);
  }

  @Get()
  async findAll() {
    var userGroups = await this.userGroupsService.findAll();
    var result = userGroups.map((p) => {
      return {
        ...p,
        pimage:
          "https://flamingcmsapi.azurewebsites.net/v1/photo?fileID=1971&tenant=Test",
      };
    });
    return result;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userGroupsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserGroupDto: UpdateUserGroupDto
  ) {
    return this.userGroupsService.update(+id, updateUserGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userGroupsService.remove(+id);
  }
}
