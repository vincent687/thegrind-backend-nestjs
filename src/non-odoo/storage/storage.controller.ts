import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  Inject,
  Injectable,
  Optional,
  UseInterceptors,
} from "@nestjs/common";
import { StorageService } from "./storage.service";
import { CreateStorageDto } from "./dto/create-storage.dto";
import { UpdateStorageDto } from "./dto/update-storage.dto";
import { FastifyFileInterceptor } from "nest-fastify-multer";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { GCP_STORAGE_BUCKET } from "src/provider/gcpStorageProvider.module";
import { Logger } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileExtender } from "src/provider/fileExtender";

@ApiTags("Storage")
@Controller("storage")
@Injectable()
export class StorageController {
  //constructor(private readonly storageService: StorageService) {}
  constructor(
    @Inject(GCP_STORAGE_BUCKET)
    private readonly storageService = new StorageService(null)
  ) {}

  @Post("/uploadFile")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        filename: { type: "string" },
        staffId: { type: "integer" },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileExtender)
  @FastifyFileInterceptor("file", {
    limits: {
      files: 1,
      fileSIZES: 1024 * 1024,
    },
  })
  async uploadFile(@UploadedFile("file") file) {
    return await this.storageService.upload("test", {
      name: file.filename,
      buffer: file.buffer,
    });
  }
}
