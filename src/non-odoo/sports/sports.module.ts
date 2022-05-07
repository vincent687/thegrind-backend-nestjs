import { Module } from "@nestjs/common";
import { SportsService } from "./sports.service";
import { SportsController } from "./sports.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sport } from "./entities/sport.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sport], "nonodoo")],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [TypeOrmModule],
})
export class SportsModule {}
