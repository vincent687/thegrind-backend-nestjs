import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutionLocationsService } from './tution-locations.service';
import { TutionLocationsController } from './tution-locations.controller';
import { TutionLocation } from './entities/tution-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TutionLocation])],
  controllers: [TutionLocationsController],
  providers: [TutionLocationsService],
  exports: [TypeOrmModule],
})
export class TutionLocationsModule {}
