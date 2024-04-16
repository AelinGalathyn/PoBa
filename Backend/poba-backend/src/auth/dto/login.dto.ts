import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'TesztElek', description: 'Felhasználónév'})
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'teszt123.!', description: 'Jelszó'})
  password: string;
}