import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller ('AppController')
export class AppController{
    constructor (private readonly appService: AppService) {}
}
