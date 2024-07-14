import { IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
