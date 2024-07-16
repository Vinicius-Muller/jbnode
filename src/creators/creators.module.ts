import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from './entities/creator.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creator, User])],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule {}
