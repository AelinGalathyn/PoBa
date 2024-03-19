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

  findAll() {
    return `This action returns all users`;
  }

  async findByUName(username: string): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
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


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  newWebshop(userid: number, webshopid: number){

  }
}
