import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CourseTutorTable1652619873856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "course_tutors_rel",
        columns: [
          {
            name: "cid",
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
    queryRunner.query(`DROP TABLE public.course_tutors_rel`);
  }
}
