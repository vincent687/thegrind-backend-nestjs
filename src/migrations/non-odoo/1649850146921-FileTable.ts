import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class FileTable1649850146921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "file",
        columns: [
          {
            name: "id",
            type: "int4",
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "classId",
            type: "int4",
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "companyId",
            type: "int4",
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "userId",
            type: "int4",
            isNullable: false,
          },
          {
            name: "type",
            type: "int4",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isPrimary: false,
            isNullable: false,
          },
          {
            name: "url",
            type: "varchar",
            isPrimary: false,
            isNullable: true,
          },
          {
            name: "filePath",
            type: "varchar",
            isPrimary: false,
            isNullable: true,
          },
          {
            name: "date",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE public.file`);
  }
}
