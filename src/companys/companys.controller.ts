import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
import { Logger } from "@nestjs/common";
import { OutPut } from "src/interface/output";

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
  async findAll(
    @Query("page") page: number,
    @Query("pageSize") pageSize: number
  ) {
    var companys = await this.companysService.findAll();
    var sliceCompanys = companys.slice((page - 1) * pageSize, page * pageSize);
    var result: OutPut = {
      data: [],
      meta: {
        total: companys.length,
      },
    };
    var companysFinal: ReadCompanyDto[] = [];
    for (var i = 0; i < sliceCompanys.length; i++) {
      var companyFinal = new ReadCompanyDto();
      var companyAttachment = await this.attachmentsService.getImageByTable(
        "res.company",
        sliceCompanys[i].id
      );
      companyFinal.attachment = companyAttachment;
      companyFinal.id = sliceCompanys[i].id;
      companyFinal.email = sliceCompanys[i].email;
      companyFinal.companyInfo = sliceCompanys[i].companyInfo;
      companyFinal.name = sliceCompanys[i].name;
      var companyUsersFinal: ReadCompanyUserDto[] = [];
      sliceCompanys[i].employees.forEach(async (k) => {
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
    result.data = companysFinal;
    return result;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    var company = await this.companysService.findOne(+id);
    var companyFinal = new ReadCompanyDto();
    var companyAttachment = await this.attachmentsService.getImageByTable(
      "res.company",
      company.id
    );

    companyFinal.attachment = companyAttachment;
    companyFinal.id = company.id;
    companyFinal.email = company.email;
    companyFinal.companyInfo = company.companyInfo;
    companyFinal.name = company.name;
    Logger.log(company.employees);
    var companyUsersFinal: ReadCompanyUserDto[] = [];
    var promise = await company.employees.map(async (k) => {
      Logger.log(k.user_id);
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
      Logger.log(companyUserFinal);
    });
    Logger.log(companyUsersFinal);
    await Promise.all(promise);
    companyFinal.employees = companyUsersFinal;
    return companyFinal;
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
