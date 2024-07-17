import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { AuthGuard } from 'src/login/login.guard';
import { CreatorsService } from './creators.service';
import { Creator } from './entities/creator.entity';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  async create(@Body() createCreatorDto: CreateCreatorDto): Promise<Creator> {
    return await this.creatorsService.create(createCreatorDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Creator[]> {
    return await this.creatorsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Creator> {
    return await this.creatorsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCreatorsDto: UpdateCreatorDto,
  ): Promise<void> {
    return await this.creatorsService.update(id, updateCreatorsDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.creatorsService.remove(id);
  }
}
