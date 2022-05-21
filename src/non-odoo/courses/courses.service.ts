import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course, "nonodoo")
    private CoursesRepository: Repository<Course>
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = {
      name: createCourseDto.name,
      description: createCourseDto.description,
      start_date: createCourseDto.start_date,
      end_date: createCourseDto.end_date,
      location: createCourseDto.location,
      createdby_user: createCourseDto.createdby_user,
      created_date: createCourseDto.created_date,
      companyId: createCourseDto.companyId,
      course_email: createCourseDto.course_email,
    };

    const newCourse = await this.CoursesRepository.create(course);

    const tutorArray =
      createCourseDto.tutors != null
        ? await createCourseDto.tutors.reduce((acc, val) => {
            return acc.concat({
              cid: newCourse.id,
              user_id: val,
            });
          }, [])
        : [];
    const studentArray =
      createCourseDto.students != null
        ? await createCourseDto.students.reduce((acc, val) => {
            return acc.concat({
              cid: newCourse.id,
              user_id: val,
            });
          }, [])
        : [];
    const tagArray =
      createCourseDto.courseTags != null
        ? await createCourseDto.courseTags.reduce((acc, val) => {
            return acc.concat({
              cid: newCourse.id,
              tag_id: val,
            });
          }, [])
        : [];

    let entity2 = {
      ...newCourse,
      tutors: tutorArray,
      students: studentArray,
      courseTags: tagArray,
    };
    Logger.log(entity2);
    await this.CoursesRepository.save(entity2);

    return newCourse;
  }

  findAll() {
    return this.CoursesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
