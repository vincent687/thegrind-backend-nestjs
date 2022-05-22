import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  UploadedFile,
  Logger,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { CreateFilesDto } from "./dto/create-files.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { GCP_STORAGE_BUCKET } from "src/provider/gcpStorageProvider.module";
import { StorageService } from "../storage/storage.service";
import { FileExtender } from "src/provider/fileExtender";
import { FastifyFileInterceptor } from "nest-fastify-multer";

@ApiTags("Non Odoo Users")
@Controller("files")
export class FilesController {
  constructor(
    @Inject(GCP_STORAGE_BUCKET)
    private readonly storageService = new StorageService(null),
    private readonly filesService: FilesService
  ) {}

  @Post()
  create(@Body() createFileDto: CreateFilesDto) {
    return this.filesService.create(createFileDto);
  }

  @Post("/uploadFile")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        filename: { type: "string" },
        userId: { type: "integer" },
        classId: { type: "integer" },
        companyId: { type: "integer" },
        type: { type: "integer" },
        url: { type: "string" },
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
    Logger.log("file", file);
    var filePath = await this.storageService.upload("test", {
      name: file.filename,
      buffer: file.buffer,
    });

    var createFileDto: CreateFilesDto = {
      name: file.filename,
      classId: file.classId,
      companyId: file.companyId,
      type: file.type,
      userId: file.userId,
      url: file.url ?? "",
      filePath: filePath ?? "",
      date: new Date(),
    };
    return this.filesService.create(createFileDto);
  }

  @Get("/user/:id")
  findAll(@Param("id") id: string) {
    return this.filesService.findAllMaterial(+id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.filesService.remove(+id);
  }
}
