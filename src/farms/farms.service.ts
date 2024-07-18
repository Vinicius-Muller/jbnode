import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from 'src/creators/entities/creator.entity';
import { Farm } from './entities/farm.entity';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Creator)
    private creatorsRepository: Repository<Creator>,

    @InjectRepository(Farm)
    private farmsRepository: Repository<Farm>,
  ) {}
  async create(createFarmDto: CreateFarmDto) {
    try {
      const assignedCreator = await this.creatorsRepository.findOne({
        where: {
          id: createFarmDto.creator_id,
        },
      });

      const newFarm = this.farmsRepository.create({
        ...createFarmDto,
        creator: assignedCreator,
      });

      const farm = await this.farmsRepository.save(newFarm);
      return farm;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.farmsRepository.find({
        relations: ['creator'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.farmsRepository.findOne({
        where: {
          id: id,
        },
        relations: ['creator'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateFarmDto: UpdateFarmDto) {
    try {
      await this.farmsRepository.findOneByOrFail({ id: id });

      const Assignedcreator = await this.creatorsRepository.findOne({
        where: { id: updateFarmDto.creator_id },
      });

      const farmToUpdate = this.farmsRepository.create({
        ...updateFarmDto,
        creator: Assignedcreator,
      });

      const updatedFarm = await this.farmsRepository.update(id, farmToUpdate);
      return updatedFarm;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.farmsRepository.findOneByOrFail({ id: id });

      await this.farmsRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
