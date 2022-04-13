import { Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { StorageController } from "./storage.controller";
// import { GcpStorageProvider } from "src/provider/gcpStorageProvider.module";
import { Bucket } from "@google-cloud/storage";
import { ConfigModule } from "src/config/config.module";
import { GcpStorageModule } from "src/provider/gcpStorageProvider.module";

@Module({
  imports: [ConfigModule, GcpStorageModule],
  controllers: [StorageController],
  // providers: [GcpStorageProvider],
})
export class StorageModule {}
