import { Injectable } from "@nestjs/common";
import { CreateAttachmentDto } from "./dto/create-attachment.dto";
import { UpdateAttachmentDto } from "./dto/update-attachment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attachment } from "./entities/attachment.entity";
import { ReadAttachmentDto } from "./dto/read-attachment.dto";
import { resourceLimits } from "worker_threads";

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private AttachmentsRepository: Repository<Attachment>
  ) {}

  create(createAttachmentDto: CreateAttachmentDto) {
    return "This action adds a new attachment";
  }

  findAll() {
    return this.AttachmentsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return `This action updates a #${id} attachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }

  async getImageByTable(table: string, id: number) {
    var result = new ReadAttachmentDto();
    var attachment = await this.AttachmentsRepository.createQueryBuilder(
      "attachment"
    )
      .where("attachment.res_model = :table and attachment.res_id = :id", {
        table,
        id,
      })
      .getOne();
    result = {
      ...attachment,
      url: `http://35.185.147.125:10012/web/image?model=${table}&id=${attachment.id}&field=${attachment.name}`,
    };
    return result;
  }
}
