import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CourseTagTable1652619992470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "course_tags_rel",
        columns: [
          {
            name: "cid",
            type: "int4",
            isNullable: false,
          },
          {
            name: "tag_id",
            type: "int4",
            isNullable: false,
          },
        ],
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE public.course_tags_rel`);
  }
}
