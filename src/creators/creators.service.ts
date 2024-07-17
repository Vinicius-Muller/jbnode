import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from './entities/creator.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(Creator)
    private creatorsRepository: Repository<Creator>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async checkIfUserEmailDoenstExist(user: User) {
    const finded = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (finded) {
      throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async create(createCreatorDto: CreateCreatorDto) {
    try {
      const newUser = this.usersRepository.create({
        ...createCreatorDto,
        username: createCreatorDto.name.toLowerCase().trim(),
        kind: createCreatorDto.kind,
      });
      await this.checkIfUserEmailDoenstExist(newUser);
      const userCreator = await this.usersRepository.save(newUser);

      const creator = this.creatorsRepository.create({
        ...createCreatorDto,
        user: userCreator,
      });

      const newCreator = await this.creatorsRepository.save(creator);

      await this.usersRepository.update(newCreator.user.id, {
        ...newCreator.user,
        creator: newCreator,
      });

      delete newCreator.user.password;
      return newCreator;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.creatorsRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.creatorsRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    try {
      await this.creatorsRepository.findOneByOrFail({ id: id });

      await this.creatorsRepository.update(id, updateCreatorDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.creatorsRepository.findOneByOrFail({ id: id });

      await this.creatorsRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
