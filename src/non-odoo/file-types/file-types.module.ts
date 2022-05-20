import { Module } from "@nestjs/common";
import { FileTypesService } from "./file-types.service";
import { FileTypesController } from "./file-types.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileType } from "./entities/file-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FileType], "nonodoo")],
  controllers: [FileTypesController],
  providers: [FileTypesService],
  exports: [TypeOrmModule, FileTypesService],
})
export class FileTypesModule {}
