import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFileTypeDto } from "./dto/create-file-type.dto";
import { UpdateFileTypeDto } from "./dto/update-file-type.dto";
import { FileType } from "./entities/file-type.entity";

@Injectable()
export class FileTypesService {
  constructor(
    @InjectRepository(FileType, "nonodoo")
    private FileTypesRepository: Repository<FileType>
  ) {}

  async create(createFileTypeDto: CreateFileTypeDto) {
    const newType = await this.FileTypesRepository.create(createFileTypeDto);
    await this.FileTypesRepository.save(newType);
    return newType;
  }

  findAll() {
    return this.FileTypesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} fileType`;
  }

  update(id: number, updateFileTypeDto: UpdateFileTypeDto) {
    return `This action updates a #${id} fileType`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileType`;
  }
}
