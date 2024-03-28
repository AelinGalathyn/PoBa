import { IsNotEmpty, IsString } from 'class-validator';

export class RegDto{
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  api_key: string;
}