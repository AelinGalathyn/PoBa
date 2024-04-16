import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
       apicall = await this.apicallsRepository.findOne({where: {webshop, url}});
       if(apicall) {
         apicall.counter += 1;
       }
       else {
         apicall = this.apicallsRepository.create({webshop: webshop, url: url, counter: 1});
       }

       await this.apicallsRepository.save(apicall);
    }
    catch (err) {
      throw new InternalServerErrorException('An error occurred while processing the API call record.');
    }
  }
}
