import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Webshop } from './entities/webshop.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class WebshopService {
  constructor(
    @InjectRepository(Webshop)
    private webshopRepository: Repository<Webshop>,

    private usersService: UsersService) {}

  async getApiKey(userid: number, webshopid: number){
    if(await this.usersService.findOne(userid)){
      const webshop = await this.webshopRepository.findOne({where: {webshopid}});
      return webshop.unas_api;
    }
    return NotFoundException;
  }

  async getUserid(webshopid: number){
    const shop = await this.webshopRepository.findOne({where: {webshopid}});
    if(shop){
      return shop.user.userid;
    }
    else {
      throw NotFoundException;
    }
  }

  async getShopsByUser(userid: number){
    const shops = await this.webshopRepository.find({where: {user: {userid: userid}}});
    if(shops){
      return shops;
    }
    else {
      throw  NotFoundException;
    }
  }

  async getUser(webshopid: number){
    const webshop = await this.webshopRepository.findOne({where: {webshopid}});
    if(webshop){
      return webshop.user;
    }
    else {
      throw NotFoundException;
    }
  }
}
