import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "src/non-odoo/files/entities/file.entity";
import { FilesService } from "src/non-odoo/files/files.service";

@Injectable()
export class VideosService {
  constructor(private readonly filesService: FilesService) {}

  findAll(courseId) {
    return this.filesService.findAllLessonsMaterial(courseId);
  }
}
