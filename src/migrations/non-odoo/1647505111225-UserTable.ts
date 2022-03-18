import { User } from "src/non-odoo/users/entities/users.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1647505111225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: "vincent",
        password: "12345678",
        email: "vincentwong687@gmail.com",
        loginId: "vincent",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Delete from public.user`);
  }
}
