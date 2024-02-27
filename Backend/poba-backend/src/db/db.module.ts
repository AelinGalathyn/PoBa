import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';

@Module({
    imports:[],
    controllers: [DbController],
    providers: [DbService],
})

export class DbModule {}