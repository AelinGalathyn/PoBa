import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApiCalls } from '../entities/apicalls.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Webshop } from '../../webshop/entities/webshop.entity';

@Injectable()
export class ApicallsService {
  constructor(
    @InjectRepository(ApiCalls)
    private apicallsRepository: Repository<ApiCalls>) {}

  async createOrUpdate(webshop: Webshop, url: string){
    let apicall: ApiCalls;
    try{
       apicall = await this.findOne(webshop, url);
       apicall.counter += 1;
      await this.apicallsRepository.save(apicall);
    }
    catch{
      apicall = this.apicallsRepository.create({webshop: webshop, url: url, counter: 1});
      await this.apicallsRepository.save(apicall);
    }
  }

  async findOne(webshop: Webshop, url: string){
    const apicall = this.apicallsRepository.findOne({where: {webshop: webshop, url: url}});
    if (apicall !== null){
      return apicall;
    }
    else {
      throw new NotFoundException;
    }
  }
}
