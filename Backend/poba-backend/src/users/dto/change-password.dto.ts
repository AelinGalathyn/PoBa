import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto{
  @IsNotEmpty()
  @IsString()
  opw: string;

  @IsNotEmpty()
  @IsString()
  npw: string;
}