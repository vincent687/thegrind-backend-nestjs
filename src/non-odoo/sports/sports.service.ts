import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSportDto } from "./dto/create-sport.dto";
import { UpdateSportDto } from "./dto/update-sport.dto";
import { Sport } from "./entities/sport.entity";

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport, "nonodoo")
    private SportsRepository: Repository<Sport>
  ) {}

  async create(createSportDto: CreateSportDto) {
    const newSport = await this.SportsRepository.create(createSportDto);
    await this.SportsRepository.save(newSport);
    return newSport;
  }

  findAll() {
    return this.SportsRepository.find();
  }

  async findOne(id: number) {
    const sport = await this.SportsRepository.findOne({
      where: {
        id: id,
      },
    });

    return sport;
  }

  update(id: number, updateSportDto: UpdateSportDto) {
    return `This action updates a #${id} sport`;
  }

  remove(id: number) {
    return `This action removes a #${id} sport`;
  }
}
