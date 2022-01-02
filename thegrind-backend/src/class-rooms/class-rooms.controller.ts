import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassRoomsService } from './class-rooms.service';
import { CreateClassRoomDto } from './dto/create-class-room.dto';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';

@ApiTags('Classroom')
@Controller('class-rooms')
export class ClassRoomsController {
  constructor(private readonly classRoomsService: ClassRoomsService) {}

  @Post()
  create(@Body() createClassRoomDto: CreateClassRoomDto) {
    return this.classRoomsService.create(createClassRoomDto);
  }

  @Get()
  findAll() {
    return this.classRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classRoomsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassRoomDto: UpdateClassRoomDto,
  ) {
    return this.classRoomsService.update(+id, updateClassRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classRoomsService.remove(+id);
  }
}
