import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      const user = await this.userRepository.findOne({
        where: {
          id: createRoleDto.user_id,
        },
      });
      const role = this.roleRepository.create({
        ...createRoleDto,
        user: user,
      });
      const newRole = await this.roleRepository.save(role);
      delete newRole.user.password;
      return newRole;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find({
        relations: ['user'],
      });

      roles.forEach((role) => {
        delete role.user.password;
      });

      return roles;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      delete role.user.password;
      return role;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      await this.roleRepository.findOneByOrFail({ id: id });

      const user = await this.userRepository.findOne({
        where: {
          id: updateRoleDto.user_id,
        },
      });

      const role = this.roleRepository.create({
        ...updateRoleDto,
        user: user,
      });

      await this.roleRepository.update(id, role);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.roleRepository.findOneByOrFail({ id: id });

      await this.roleRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
