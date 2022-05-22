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
import { CompanysService } from "./companys.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@ApiTags("Non Odoo Users")
@Controller("companysNonOdoo")
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth("JWT-auth")
  create(@Req() req: any, @Body() createCompanyDto: CreateCompanyDto) {
    if (createCompanyDto.users == null) {
      createCompanyDto.users = [req.user.id];
    } else {
      createCompanyDto.users.concat(req.user.id);
    }
    return this.companysService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  findAll(@Req() req: any) {
    return this.companysService.findAll(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companysService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companysService.update(+id, updateCompanyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companysService.remove(+id);
  }
}
