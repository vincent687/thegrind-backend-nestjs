import { Bucket } from "@google-cloud/storage";
import { Injectable, Logger } from "@nestjs/common";
import { url } from "inspector";

import { ConfigService } from "../../config/config.service";
import { Storage } from "@google-cloud/storage";
const path = require("path");

@Injectable()
export class StorageService {
  constructor(
    private readonly config: ConfigService // private readonly bucket: Bucket, // private readonly baseUrl: string
  ) {}

  async upload(
    directory: string,
    image: {
      name: string;
      buffer: Buffer;
    },
    metadata?: object
  ): Promise<string> {
    const bucketConfig = this.config.getGcpStorageConfig();
    Logger.log(bucketConfig);
    const baseUrl = `https://storage.cloud.google.com/${bucketConfig.bucketName}`;
    const bucket = new Storage({
      projectId: bucketConfig.projectId,
      credentials: {
        client_email: bucketConfig.email,
        private_key: bucketConfig.key.replace(/\\n/gm, "\n"),
      },
    }).bucket(bucketConfig.bucketName);

    Logger.log(image.name);
    const filePath = path.join(directory, image.name);
    Logger.log(filePath);
    const file = bucket.file(filePath);
    Logger.log(file);
    const options = metadata ? { metadata } : undefined;
    await file.save(image.buffer, options);
    const uri = new URL(baseUrl);
    if (baseUrl.endsWith(bucket.name)) {
      uri.pathname = path.join(directory, image.name);
      Logger.log(uri.pathname);
    } else {
      uri.pathname = path.join(bucket.name, directory, image.name);
    }
    Logger.log(uri.toString());
    return uri.toString();
  }
}
