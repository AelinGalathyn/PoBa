import { Body, Controller, Get, Post } from '@nestjs/common';
import { DbService } from './db.service';
import { PasswordService } from './password.service';
import { User } from './db.dtos';

@Controller('db')
export class DbController {
  constructor(private readonly databaseService: DbService, private readonly pwService: PasswordService) {}

  /*@Get('test')
  testDbConnection() {
    return this.databaseService.query('CREATE TABLE customer2 (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, c_name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, username VARCHAR(50) NOT NULL, c_mobile VARCHAR(15) NOT NULL);');
  }*/


  
}
