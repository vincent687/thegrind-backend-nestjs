import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VideoCommentTable1653799672340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "video_comment",
        columns: [
          {
            name: "id",
            type: "int4",
            isNullable: false,
          },
          {
            name: "videoId",
            type: "int4",
            isNullable: false,
          },
          {
            name: "userId",
            type: "int4",
            isNullable: false,
          },
          {
            name: "content",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_time",
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
    queryRunner.query(`DROP TABLE public.video_comment`);
  }
}
