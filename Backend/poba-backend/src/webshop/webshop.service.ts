import { ImATeapotException, Injectable, NotFoundException } from '@nestjs/common';
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
    let shop = this.webshopRepository.create({
      user: users,
      unas_api: api_key,
      unas_token: 'asd',
    });
    shop = await this.unasLogin(shop);
    return await this.webshopRepository.save(shop);
  }

  async getToken(webshopid: number){
    const webshop = await this.webshopRepository.findOne({where: {webshopid}});
    if(webshop){
      let res = await this.unasLogin(webshop);
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

  async validateMatch(userid: number, webshopid: number){
    try {
      const ws = await this.getWebshopById(webshopid);
      if(ws.user.userid === userid){
        return true;
      }
      else {
        throw new ImATeapotException;
      }
    }catch (err){
      return err;
    }
  }

  async findAndValidate(userid: number, webshopid: number){
    try {
      const ws = await this.getWebshopById(webshopid);
      if(await this.validateMatch(userid, webshopid)){
        return ws;
      }
      else {
        return false;
      }
    } catch (err){
      return err;
    }
  }

  async unasLogin(webshop: Webshop){
    webshop = await this.externalService.unasLogin(webshop);
    await this.webshopRepository.save(webshop);
    return webshop;
  }
}
