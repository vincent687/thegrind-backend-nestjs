import { Injectable } from "@nestjs/common";
import { CreateMyLessonDto } from "./dto/create-my-lesson.dto";
import { UpdateMyLessonDto } from "./dto/update-my-lesson.dto";

@Injectable()
export class MyLessonsService {
  create(createMyLessonDto: CreateMyLessonDto) {
    return "This action adds a new myLesson";
  }

  findAll() {
    return `This action returns all myLessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myLesson`;
  }

  update(id: number, updateMyLessonDto: UpdateMyLessonDto) {
    return `This action updates a #${id} myLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} myLesson`;
  }
}
