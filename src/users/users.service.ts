import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 8),
      });

      const user = await this.userRepository.save(newUser);
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string | any) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.findOneByOrFail({ id: id });

      await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.findOneByOrFail({ id: id });

      await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
