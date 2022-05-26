import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LessonTable1653537962051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "lesson",
        columns: [
          {
            name: "id",
            type: "int4",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "company_id",
            type: "int4",
            isNullable: false,
          },
          {
            name: "course_id",
            type: "int4",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "start_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "location",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdby_user",
            type: "int4",
            isNullable: false,
          },
          {
            name: "created_date",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE public.lesson`);
  }
}
