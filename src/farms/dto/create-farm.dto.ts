import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  code_integration: number;

  @IsNotEmpty()
  @IsNumber()
  period_service: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  creator_id: string;
}
