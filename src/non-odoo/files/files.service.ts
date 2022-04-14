import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFilesDto } from "./dto/create-files.dto";
import { ReadFileDto } from "./dto/read-files.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { File } from "./entities/file.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File, "nonodoo")
    private FilesRepository: Repository<File>
  ) {}

  async create(createFileDto: CreateFilesDto) {
    const newFile = await this.FilesRepository.create(createFileDto);
    await this.FilesRepository.save(newFile);
    return newFile;
  }

  async findAllMaterial(userId: number) {
    const files = await this.FilesRepository.find({
      where: {
        userId: userId,
      },
    });

    const result: ReadFileDto[] = files.map((key, index) => {
      let thumbnail = "";
      if (key.filePath) {
        if (key.filePath.includes("https://storage.cloud.google.com")) {
          key.filePath = key.filePath.replace(
            "https://storage.cloud.google.com",
            "https://storage.googleapis.com/thegrind_videostorage"
          );
        }
      }
      if (key.url) {
        if (key.url.includes("youtu.be")) {
          const segemnts = key.url.split("/");
          const last = segemnts.pop() || segemnts.pop();
          thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
        }
        if (key.url.includes("youtube")) {
          const segments = key.url.split("?");
          const query = segments[1];
          const params = new URLSearchParams(query);
          if (params.has("v")) {
            thumbnail = `https://img.youtube.com/vi/${params.get("v")}/0.jpg`;
          }
          // thumbnail = `https://img.youtube.com/vi/${last}/0.jpg`;
        }
      }
      const obj: ReadFileDto = {
        ...key,
        thumbnail: thumbnail,
      };
      return obj;
    });

    //const result: ReadFileDto = { ...user };

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
