import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { LessonNonOdoo } from "./entities/lesson.entity";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonNonOdoo, "nonodoo")
    private LessonsRepository: Repository<LessonNonOdoo>
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = {
      name: createLessonDto.name,
      start_date: createLessonDto.start_date,
      end_date: createLessonDto.end_date,
      location: createLessonDto.location,
      description: createLessonDto.description,
      course_id: createLessonDto.course_id,
      company_id: createLessonDto.company_id,
      createdby_user: createLessonDto.createdby_user,
    };

    await this.LessonsRepository.createQueryBuilder()
      .insert()
      .into(LessonNonOdoo)
      .values([lesson])
      .returning("id")
      .execute();

    const newLesson = await this.LessonsRepository.create(lesson);
    Logger.log(newLesson.id);
    const tutorArray =
      createLessonDto.tutors != null
        ? await createLessonDto.tutors.reduce((acc, val) => {
            return acc.concat({
              lid: newLesson.id,
              user_id: val,
            });
          }, [])
        : [];
    const studentArray =
      createLessonDto.students != null
        ? await createLessonDto.students.reduce((acc, val) => {
            return acc.concat({
              lid: newLesson.id,
              user_id: val,
            });
          }, [])
        : [];

    let entity2 = {
      ...newLesson,
      tutors: tutorArray,
      students: studentArray,
    };
    Logger.log(entity2);
    await this.LessonsRepository.save(entity2);
    return newLesson;
  }

  findAll(): Promise<LessonNonOdoo[]> {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.tutors", "lessonTutor")
      .leftJoinAndSelect("lessonTutor.user", "tutor")
      .leftJoinAndSelect("lesson.students", "lessonStudent")
      .leftJoinAndSelect("lessonStudent.user", "student")
      .getMany();
  }

  findAllByCourseId(id: number): Promise<LessonNonOdoo[]> {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.tutors", "lessonTutor")
      .leftJoinAndSelect("lessonTutor.user", "tutor")
      .leftJoinAndSelect("lesson.students", "lessonStudent")
      .leftJoinAndSelect("lessonStudent.user", "student")
      .where("lesson.course_id = :id", { id })
      .getMany();
  }

  findAllByCompanyId(id: number) {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.tutors", "lessonTutor")
      .leftJoinAndSelect("lessonTutor.user", "tutor")
      .leftJoinAndSelect("lesson.students", "lessonStudent")
      .leftJoinAndSelect("lessonStudent.user", "student")
      .where("lesson.company_id = :id ", {
        id,
      })
      .getMany();
  }

  findOne(id: number, courseId: number) {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.tutors", "lessonTutor")
      .leftJoinAndSelect("lessonTutor.user", "tutor")
      .leftJoinAndSelect("lesson.students", "lessonStudent")
      .leftJoinAndSelect("lessonStudent.user", "student")
      .where("lesson.id = :id and lesson.course_id = :courseId", {
        id,
        courseId,
      })
      .getOne();
  }

  findOneWithoutCourseId(id: number) {
    return this.LessonsRepository.createQueryBuilder("lesson")
      .leftJoinAndSelect("lesson.tutors", "lessonTutor")
      .leftJoinAndSelect("lessonTutor.user", "tutor")
      .leftJoinAndSelect("lesson.students", "lessonStudent")
      .leftJoinAndSelect("lessonStudent.user", "student")
      .where("lesson.id = :id ", {
        id,
      })
      .getOne();
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = {
      id: updateLessonDto.id,
      name: updateLessonDto.name,
      description: updateLessonDto.description,
      start_date: updateLessonDto.start_date,
      end_date: updateLessonDto.end_date,
      location: updateLessonDto.location,
      createdby_user: updateLessonDto.createdby_user,
      company_id: updateLessonDto.company_id,
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
      updateLessonDto.tutors != null
        ? await updateLessonDto.tutors.reduce((acc, val) => {
            return acc.concat({
              lid: updateLessonDto.id,
              user_id: val,
            });
          }, [])
        : [];
    const studentArray =
      updateLessonDto.students != null
        ? await updateLessonDto.students.reduce((acc, val) => {
            return acc.concat({
              lid: updateLessonDto.id,
              user_id: val,
            });
          }, [])
        : [];

    let entity2 = {
      ...lesson,
      tutors: tutorArray,
      students: studentArray,
    };
    Logger.log(entity2);
    await this.LessonsRepository.save(entity2);

    return entity2;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
