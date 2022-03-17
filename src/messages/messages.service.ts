import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message, "odoo")
    private MessagesRepository: Repository<Message>
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return "This action adds a new message";
  }

  findAll() {
    return this.MessagesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
