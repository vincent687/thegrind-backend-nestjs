import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TutionLocationsService } from "./tution-locations.service";
import { CreateTutionLocationDto } from "./dto/create-tution-location.dto";
import { UpdateTutionLocationDto } from "./dto/update-tution-location.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Tution Locations")
@Controller("tution-locations")
export class TutionLocationsController {
  constructor(
    private readonly tutionLocationsService: TutionLocationsService
  ) {}

  @Post()
  create(@Body() createTutionLocationDto: CreateTutionLocationDto) {
    return this.tutionLocationsService.create(createTutionLocationDto);
  }

  @Get()
  findAll() {
    return this.tutionLocationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tutionLocationsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTutionLocationDto: UpdateTutionLocationDto
  ) {
    return this.tutionLocationsService.update(+id, updateTutionLocationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tutionLocationsService.remove(+id);
  }
}
