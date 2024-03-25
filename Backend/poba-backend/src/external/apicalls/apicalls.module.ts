import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApicallsService } from './apicalls.service';
import { ApiCalls } from '../entities/apicalls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiCalls])],
  providers: [ApicallsService],
  exports: [ApicallsService],
})
export class ApicallsModule {}
