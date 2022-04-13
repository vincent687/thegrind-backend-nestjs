import { Storage } from "@google-cloud/storage";
import { StorageService } from "../non-odoo/storage/storage.service";
import { ConfigService } from "src/config/config.service";
import { Logger, Module } from "@nestjs/common";

export const GCP_STORAGE_BUCKET = "GCP_STORAGE_BUCKET";

const GcpStorageProvider = {
  provide: GCP_STORAGE_BUCKET,
  useFactory: (configService: ConfigService) => {
    configService = new ConfigService(process.env);
    const bucketConfig = configService.getGcpStorageConfig();
    Logger.log(bucketConfig);
    const baseUrl = `https://storage.cloud.google.com/${bucketConfig.bucketName}`;
    const bucket = new Storage({ projectId: bucketConfig.projectId }).bucket(
      bucketConfig.bucketName
    );
    return new StorageService(configService);
  },
  //  inject: [ConfigTestService],
};

@Module({
  imports: [ConfigService],
  providers: [GcpStorageProvider],
  exports: [GcpStorageProvider],
})
export class GcpStorageModule {}
