import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);

      return await this.roleRepository.save(role);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.roleRepository.find({
        relations: ['user'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.roleRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      await this.roleRepository.findOneByOrFail({ id: id });

      await this.roleRepository.update(id, updateRoleDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    await this.roleRepository.findOneByOrFail({ id: id });

    await this.roleRepository.delete(id);
  }
}
