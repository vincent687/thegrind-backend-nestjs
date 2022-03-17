import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";
import { Repository } from "typeorm";
import { Partner } from "./entities/partner.entity";

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner, "odoo")
    private PartnersRepository: Repository<Partner>
  ) {}

  create(createPartnerDto: CreatePartnerDto) {
    return "This action adds a new partner";
  }

  findAll(): Promise<Partner[]> {
    return this.PartnersRepository.find();
  }

  findOne(id: number) {
    return this.PartnersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
