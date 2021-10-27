import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PartnersController } from './partners/partners.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersModule } from './partners/partners.module';
import { PartnersService } from './partners/partners.service';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PartnersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PartnersService],
})
export class AppModule {}
