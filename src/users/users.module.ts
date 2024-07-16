import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Creator } from 'src/creators/entities/creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Creator])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
