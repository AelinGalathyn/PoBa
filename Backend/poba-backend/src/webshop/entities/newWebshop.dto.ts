import { Webshop } from './webshop.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewWebshopDto{
  @IsNotEmpty()
  @IsNumber()
  userid: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  unas_api: string;

}