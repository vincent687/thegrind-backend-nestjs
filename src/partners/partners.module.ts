import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnersService } from "./partners.service";
import { PartnersController } from "./partners.controller";
import { Partner } from "./entities/partner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Partner], "odoo")],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [TypeOrmModule],
})
export class PartnersModule {}
