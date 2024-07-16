import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCreatorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  kind: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  operation: boolean;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;
}
