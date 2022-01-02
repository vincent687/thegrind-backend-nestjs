import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor)
    private tutorsRepository: Repository<Tutor>,
  ) {}

  create(createTutorDto: CreateTutorDto) {
    return 'This action adds a new tutor';
  }

  findAll() {
    return this.tutorsRepository
      .createQueryBuilder('tutor')
      .leftJoinAndSelect('tutor.employee', 'employee')
      .leftJoinAndSelect('tutor.channel', 'channel')
      .leftJoinAndSelect('tutor.class_room', 'class_room')
      .leftJoinAndSelect('tutor.location', 'location')
      .getMany();
    //return this.tutorsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tutor`;
  }

  update(id: number, updateTutorDto: UpdateTutorDto) {
    return `This action updates a #${id} tutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }
}
