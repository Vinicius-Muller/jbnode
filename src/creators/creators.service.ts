import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from './entities/creator.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(Creator)
    private creatorsRepository: Repository<Creator>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createCreatorDto: CreateCreatorDto) {
    try {
      const newUser = this.usersRepository.create({
        ...createCreatorDto,
      });

      const creator = this.creatorsRepository.create({
        ...createCreatorDto,
        user: newUser,
      });

      console.log(creator);
      /* const newCreator = await this.creatorsRepository.save(creator);
      delete newCreator.password;
      return newCreator; */
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all creators`;
  }

  findOne(id: string) {
    return `This action returns a #${id} creator`;
  }

  update(id: string, updateCreatorDto: UpdateCreatorDto) {
    return `This action updates a #${id} creator`;
  }

  remove(id: string) {
    return `This action removes a #${id} creator`;
  }
}
