import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Webshop } from './entities/webshop.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ExternalService } from '../external/external.service';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class WebshopService {
  constructor(
    @InjectRepository(Webshop)
    private webshopRepository: Repository<Webshop>,
    private externalService: ExternalService) {}

  async getWebshopById(webshopid: number){
    const webshop = await this.webshopRepository.findOne({where: {webshopid}});
    if(webshop){
      return webshop;
    }
    else{
      throw new NotFoundException;
    }
  }

  async getApiKey(webshopid: number){
      const webshop = await this.webshopRepository.findOne({where: {webshopid}});
      if(webshop){
        return webshop.unas_api;
      }
      else {
        throw new NotFoundException;
      }
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

  async newApiKey(users: Users, api_key: string){
    const shop = this.webshopRepository.create({
      user: users,
      unas_api: api_key,
      unas_token: 'asd'
    });
    const token = await this.externalService.unasLogin(shop);
    shop.unas_token = token;
    return await this.webshopRepository.save(shop);
  }

  async getToken(webshopid: number){
    const webshop = await this.webshopRepository.findOne({where: {webshopid}});
    if(webshop){
      const token = await this.externalService.unasLogin(webshop);
      webshop.unas_token = token;
      await this.webshopRepository.update(webshopid, webshop);
    }
    return webshop.unas_token;
  }

  async newToken(webshopid: number){
    const token = await this.getToken(webshopid);
    const webshop = await this.webshopRepository.findOne({where: {webshopid}});
    webshop.unas_token = token;
    const ws = await this.webshopRepository.save(webshop);
    return ws;
  }
}
