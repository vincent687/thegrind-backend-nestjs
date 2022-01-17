import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  controllers: [TutorsController],
  providers: [TutorsService],
  exports: [TypeOrmModule],
})
export class TutorsModule {}
