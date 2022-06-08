import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StudentAttendanceTable1654576525273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student_attendances",
        columns: [
          {
            name: "id",
            type: "int4",
            isNullable: false,
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int4",
            isNullable: false,
          },
          {
            name: "lesson_id",
            type: "int4",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "custom_status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "create_date",
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
    queryRunner.query(`DROP TABLE public.student_attendances`);
  }
}
