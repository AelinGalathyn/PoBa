import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,){}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findByUName(username: string): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({ where: { username: username } });
    return user;
  }

  async getPassword(username: string){
    const user = await this.usersRepository.findOne({where: {username}});
    return user.password;
  }

  async findById(userid: number): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({ where: { userid } });
    return user;
  }

  async changePassword(user: Users, hashedPassword: string){
    user.password = hashedPassword;
    const newUser =  await this.usersRepository.update({userid: user.userid}, {password: hashedPassword});
    console.log(hashedPassword);
    return newUser;
  }
}
