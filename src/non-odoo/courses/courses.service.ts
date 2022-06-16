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

    await this.CoursesRepository.createQueryBuilder()
      .insert()
      .into(Course)
      .values([course])
      .returning("id")
      .execute();

    // Logger.log("test:", test);

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

  findAllByCompanyId(id: number): Promise<Course[]> {
    return this.CoursesRepository.createQueryBuilder("course")
      .leftJoinAndSelect("course.tutors", "courseTutor")
      .leftJoinAndSelect("courseTutor.user", "tutor")
      .leftJoinAndSelect("course.students", "courseStudent")
      .leftJoinAndSelect("courseStudent.user", "student")
      .leftJoinAndSelect("course.courseTags", "courseTag")
      .leftJoinAndSelect("courseTag.tag", "tag")
      .where("course.companyId = :id", { id })
      .getMany();
  }

  async findOneWithoutTag(id: number) {
    let course = await this.CoursesRepository.createQueryBuilder("course")
      .where("course.id = :id ", { id })
      .getOne();

    return {
      ...course,
    };
  }

  findAllByUserId(id: number): Promise<Course[]> {
    return this.CoursesRepository.createQueryBuilder("course")
      .leftJoinAndSelect("course.tutors", "courseTutor")
      .leftJoinAndSelect("courseTutor.user", "tutor")
      .leftJoinAndSelect("course.students", "courseStudent")
      .leftJoinAndSelect("courseStudent.user", "student")
      .leftJoinAndSelect("course.courseTags", "courseTag")
      .leftJoinAndSelect("courseTag.tag", "tag")
      .where("courseTutor.user_id = :id or courseStudent.user_id =:id ", { id })
      .getMany();
  }

  async findOne(id: number) {
    let course = await this.CoursesRepository.createQueryBuilder("course")
      .leftJoinAndSelect("course.tutors", "courseTutor")
      .leftJoinAndSelect("courseTutor.user", "tutor")
      .leftJoinAndSelect("course.students", "courseStudent")
      .leftJoinAndSelect("courseStudent.user", "student")
      .leftJoinAndSelect("course.courseTags", "courseTag")
      .leftJoinAndSelect("courseTag.tag", "tag")
      .where("course.id = :id ", { id })
      .getOne();

    Logger.log(course);
    return {
      ...course,
      courseTags: course.courseTags
        .map((x) => {
          if (x.tag != null) {
            console.log(x.tag);
            return x.tag.id;
          }
        })
        .filter((u) => u != null),
      tutors: course.tutors
        .map((x) => {
          return x.user.id;
        })
        .filter((u) => u != null),
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = {
      id: updateCourseDto.id,
      name: updateCourseDto.name,
      description: updateCourseDto.description,
      start_date: updateCourseDto.start_date,
      end_date: updateCourseDto.end_date,
      location: updateCourseDto.location,
      createdby_user: updateCourseDto.createdby_user,
      created_date: updateCourseDto.created_date,
      companyId: updateCourseDto.companyId,
      course_email: updateCourseDto.course_email,
    };

    // await this.CoursesRepository.createQueryBuilder()
    //   .insert()
    //   .into(Course)
    //   .values([course])
    //   .returning("id")
    //   .execute();

    // Logger.log("test:", test);

    // const newCourse = await this.CoursesRepository.create(course);

    const tutorArray =
      updateCourseDto.tutors != null
        ? await updateCourseDto.tutors.reduce((acc, val) => {
            return acc.concat({
              cid: updateCourseDto.id,
              user_id: val,
            });
          }, [])
        : [];
    const studentArray =
      updateCourseDto.students != null
        ? await updateCourseDto.students.reduce((acc, val) => {
            return acc.concat({
              cid: updateCourseDto.id,
              user_id: val,
            });
          }, [])
        : [];
    const tagArray =
      updateCourseDto.courseTags != null
        ? await updateCourseDto.courseTags.reduce((acc, val) => {
            return acc.concat({
              cid: updateCourseDto.id,
              tag_id: val,
            });
          }, [])
        : [];

    let entity2 = {
      ...course,
      tutors: tutorArray,
      students: studentArray,
      courseTags: tagArray,
    };
    Logger.log(entity2);
    await this.CoursesRepository.save(entity2);

    return entity2;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
