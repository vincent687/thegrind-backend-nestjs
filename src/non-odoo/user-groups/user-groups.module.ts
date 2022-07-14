import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserGroup } from "./entities/user-group.entitiy";
import { UserGroupsController } from "./user-groups.controller";
import { UserGroupsService } from "./user-groups.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserGroup], "nonodoo")],
  controllers: [UserGroupsController],
  providers: [UserGroupsService],
  exports: [TypeOrmModule, UserGroupsService],
})
export class UserGroupsModule {}
