import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CompanyTable1652620998440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "company",
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
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "companyInfo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "establishDate",
            type: "date",
            isNullable: true,
          },
          {
            name: "types",
            type: "jsonb",
            isNullable: false,
          },
        ],
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE public.company`);
  }
}
