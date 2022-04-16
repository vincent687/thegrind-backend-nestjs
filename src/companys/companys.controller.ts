import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AttachmentsService } from "src/attachments/attachments.service";
import { ReadPartnerDto } from "src/partners/dto/read-partner.dto";
import { ReadCompanyUserDto } from "src/users-odoo/dto/read-company-user.dto";
import { ReadUserDto } from "src/users-odoo/dto/read-user.dto";
import { CompanysService } from "./companys.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { ReadCompanyDto } from "./dto/read-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@ApiTags("Companys")
@Controller("companys")
export class CompanysController {
  constructor(
    private readonly companysService: CompanysService,
    private readonly attachmentsService: AttachmentsService
  ) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companysService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    var companys = await this.companysService.findAll();
    var companysFinal: ReadCompanyDto[] = [];
    for (var i = 0; i < companys.length; i++) {
      var companyFinal = new ReadCompanyDto();
      var companyAttachment = await this.attachmentsService.getImageByTable(
        "res.company",
        companys[i].id
      );
      companyFinal.attachment = companyAttachment;
      companyFinal.id = companys[i].id;
      companyFinal.email = companys[i].email;
      companyFinal.companyInfo = companys[i].companyInfo;
      companyFinal.name = companys[i].name;
      var companyUsersFinal: ReadCompanyUserDto[] = [];
      companys[i].employees.forEach(async (k) => {
        var companyUserFinal = new ReadCompanyUserDto();
        companyUserFinal.cid = k.cid;
        companyUserFinal.company = k.company;
        companyUserFinal.user_id = k.user_id;
        companyUserFinal.user = new ReadUserDto();
        companyUserFinal.user.id = k.user.id;
        companyUserFinal.user.companys = k.user.companys;
        var attachment = await this.attachmentsService.getImageByTable(
          "res.partner",
          k.user.partner.id
        );
        companyUserFinal.user.partner = { ...k.user.partner, attachment };

        companyUsersFinal.push(companyUserFinal);
      });

      companyFinal.employees = companyUsersFinal;
      companysFinal.push(companyFinal);
    }
    return companysFinal;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    var company = await this.companysService.findOne(+id);
    var companyFinal = new ReadCompanyDto();
    var companyAttachment = await this.attachmentsService.getImageByTable(
      "res.company",
      company.id
    );
    return company;
    // companyFinal.attachment = companyAttachment;
    // companyFinal.id = company.id;
    // companyFinal.email = company.email;
    // companyFinal.companyInfo = company.companyInfo;
    // companyFinal.name = company.name;
    // var companyUsersFinal: ReadCompanyUserDto[] = [];
    // company.employees.forEach(async (k) => {
    //   var companyUserFinal = new ReadCompanyUserDto();
    //   companyUserFinal.cid = k.cid;
    //   companyUserFinal.company = k.company;
    //   companyUserFinal.user_id = k.user_id;
    //   companyUserFinal.user = new ReadUserDto();
    //   companyUserFinal.user.id = k.user.id;
    //   companyUserFinal.user.companys = k.user.companys;
    //   var attachment = await this.attachmentsService.getImageByTable(
    //     "res.partner",
    //     k.user.partner.id
    //   );
    //   companyUserFinal.user.partner = { ...k.user.partner, attachment };
    //   companyUsersFinal.push(companyUserFinal);
    // });

    // companyFinal.employees = companyUsersFinal;
    // return companyFinal;
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
