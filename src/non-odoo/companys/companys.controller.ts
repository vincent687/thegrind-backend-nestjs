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
import { FilesService } from "../files/files.service";
import { urlToHttpOptions } from "url";

@ApiTags("Non Odoo Users")
@Controller("companysNonOdoo")
export class CompanysController {
  constructor(
    private readonly companysService: CompanysService,
    private readonly filesService: FilesService
  ) {}

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
  async findAll(@Req() req: any) {
    var companies = await this.companysService.findAll(req.user.id);
    var result = await companies.map(async (u) => {
      var profile = await this.filesService.findCompanyProfile(u.id);
      return {
        ...u,
        profile: profile,
      };
    });
    var results = await Promise.all(result);
    return results;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    var company = await this.companysService.findOne(+id);
    var profile = await this.filesService.findCompanyProfile(company.id);

    var result = {
      ...company,
      profile: profile,
    };
    return result;
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
