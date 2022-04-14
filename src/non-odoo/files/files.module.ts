import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { ConfigModule } from "src/config/config.module";
import { GcpStorageModule } from "src/provider/gcpStorageProvider.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";

@Module({
  imports: [
    ConfigModule,
    GcpStorageModule,
    TypeOrmModule.forFeature([File], "nonodoo"),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [TypeOrmModule, FilesService],
})
export class FilesModule {}
