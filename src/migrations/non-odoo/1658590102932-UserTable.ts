import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1658590102932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN  "description" varchar null`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN  "phoneNo" varchar null`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN  "statistic" jsonb null`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN  "description"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN  "phoneNo"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN  "statistic"`);
  }
}
