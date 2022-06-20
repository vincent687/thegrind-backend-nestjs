import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { ApiTags } from "@nestjs/swagger";
import { SearchUsersService } from "./searchUsers.service";

@ApiTags("Non Odoo Users")
@Controller("usersNonOdoo")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly searchUsersService: SearchUsersService
  ) {}

  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  findAll() {
    //return this.usersService.findAll();
    return this.searchUsersService.searchAllUsers();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(+id, updateUsersDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
