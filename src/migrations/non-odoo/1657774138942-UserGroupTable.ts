import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserGroupTable1657774138942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_group",
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
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "value",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE public.user_group`);
  }
}
