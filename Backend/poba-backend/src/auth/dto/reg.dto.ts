import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'TesztElek', description: 'Felhasználónév'})
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'teszt123.!', description: 'Jelszó'})
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'lajvn123KHBK1H23', description: 'UNAS api token a felhasználó webshopjához'})
  api_key: string;
}