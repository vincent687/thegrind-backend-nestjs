import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserGroupDto } from "./dto/create-user-group.dto";
import { UpdateUserGroupDto } from "./dto/update-user-group.dto";
import { UserGroup } from "./entities/user-group.entitiy";

@Injectable()
export class UserGroupsService {
  constructor(
    @InjectRepository(UserGroup, "nonodoo")
    private UserGroupsRepository: Repository<UserGroup>
  ) {}

  async create(createUserGroupDto: CreateUserGroupDto) {
    const userGroup = {
      user_id: createUserGroupDto.id,
      name: createUserGroupDto.name,
      value: createUserGroupDto.value,
    };

    await this.UserGroupsRepository.createQueryBuilder()
      .insert()
      .into(UserGroup)
      .values([userGroup])
      .returning("id")
      .execute();
    const newUserGroup = await this.UserGroupsRepository.create(userGroup);

    await this.UserGroupsRepository.save(userGroup);
    return newUserGroup;
  }

  findAll() {
    return this.UserGroupsRepository.find();
  }

  findOne(id: number) {
    return this.UserGroupsRepository.createQueryBuilder("userGroup")
      .where("userGroup.id = :id", { id })
      .getOne();
  }

  async update(id: number, updateUserGroupsDto: UpdateUserGroupDto) {
    const group = {
      id: updateUserGroupsDto.id,
      name: updateUserGroupsDto.name,
      value: updateUserGroupsDto.value,
    };

    await this.UserGroupsRepository.save(group);

    return group;
  }

  remove(id: number) {
    return `This action removes a #${id} userGroup`;
  }
}
