import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTutionLocationDto } from "./dto/create-tution-location.dto";
import { UpdateTutionLocationDto } from "./dto/update-tution-location.dto";
import { TutionLocation } from "./entities/tution-location.entity";

@Injectable()
export class TutionLocationsService {
  constructor(
    @InjectRepository(TutionLocation, "odoo")
    private TutionLocationsRepository: Repository<TutionLocation>
  ) {}

  create(createTutionLocationDto: CreateTutionLocationDto) {
    return "This action adds a new tutionLocation";
  }

  findAll() {
    return this.TutionLocationsRepository.find();
  }

  findOne(id: number) {
    return this.TutionLocationsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTutionLocationDto: UpdateTutionLocationDto) {
    return `This action updates a #${id} tutionLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutionLocation`;
  }
}
