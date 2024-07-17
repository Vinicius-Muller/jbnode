import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        select: [
          'name',
          'username',
          'email',
          'id',
          'kind',
          'created_at',
          'updated_at',
        ],
        relations: ['roles', 'creator'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string | any) {
    return await this.userRepository.findOne({
      where: { id: id },
      select: [
        'name',
        'username',
        'email',
        'id',
        'kind',
        'created_at',
        'updated_at',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.findOneByOrFail({ id: id });

      await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.findOneByOrFail({ id: id });

      await this.userRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
