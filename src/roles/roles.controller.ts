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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/login/login.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<CreateRoleDto | any> {
    return await this.rolesService.create(createRoleDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<CreateRoleDto[] | any> {
    return await this.rolesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreateRoleDto | any> {
    return await this.rolesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<void> {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.rolesService.remove(id);
  }
}
