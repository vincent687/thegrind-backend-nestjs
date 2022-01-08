import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new lesson';
  }

  findAll(): Promise<Lesson[]> {
    //findAll() {
    // return null;
    return this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.course', 'course')
      .getMany();
  }

  findOne(id: number) {
    return this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.course', 'course')
      .where('lesson.id = :id', { id })
      .getOne();
    // return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
