import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatorDto } from './create-creator.dto';
import { User } from 'src/users/entities/user.entity';

export class UpdateCreatorDto extends PartialType(CreateCreatorDto) {
  user: User;
}
