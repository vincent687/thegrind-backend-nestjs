import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LessonTutorTable1653539135006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "lesson_tutors_rel",
        columns: [
          {
            name: "lid",
            type: "int4",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int4",
            isNullable: false,
          },
        ],
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE public.lesson_tutors_rel`);
  }
}
