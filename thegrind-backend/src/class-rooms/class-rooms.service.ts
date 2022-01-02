import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassRoomDto } from './dto/create-class-room.dto';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { ClassRoom } from './entities/class-room.entity';

@Injectable()
export class ClassRoomsService {
  constructor(
    @InjectRepository(ClassRoom)
    private ClassRoomsRepository: Repository<ClassRoom>,
  ) {}

  create(createClassRoomDto: CreateClassRoomDto) {
    return 'This action adds a new classRoom';
  }

  findAll() {
    return this.ClassRoomsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} classRoom`;
  }

  update(id: number, updateClassRoomDto: UpdateClassRoomDto) {
    return `This action updates a #${id} classRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classRoom`;
  }
}
