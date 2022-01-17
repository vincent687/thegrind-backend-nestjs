import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTutionLocationDto } from './dto/create-tution-location.dto';
import { UpdateTutionLocationDto } from './dto/update-tution-location.dto';
import { TutionLocation } from './entities/tution-location.entity';

@Injectable()
export class TutionLocationsService {
  constructor(
    @InjectRepository(TutionLocation)
    private tutionLocationsRepository: Repository<TutionLocation>,
  ) {}

  create(createTutionLocationDto: CreateTutionLocationDto) {
    return 'This action adds a new tutionLocation';
  }

  findAll() {
    return this.tutionLocationsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tutionLocation`;
  }

  update(id: number, updateTutionLocationDto: UpdateTutionLocationDto) {
    return `This action updates a #${id} tutionLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutionLocation`;
  }
}
