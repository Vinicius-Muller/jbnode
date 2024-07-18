import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from 'src/creators/entities/creator.entity';
import { Farm } from './entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Creator])],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}
