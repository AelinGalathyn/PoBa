import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApiCalls } from '../entities/apicalls.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApicallsService {
  constructor(
    @InjectRepository(ApiCalls)
    private apicallsRepository: Repository<ApiCalls>) {}


}
