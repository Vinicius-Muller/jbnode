import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  kind: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
