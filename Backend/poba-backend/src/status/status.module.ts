import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { WebshopModule } from '../webshop/webshop.module';
import { ExternalModule } from '../external/external.module';

@Module({
  imports: [WebshopModule, ExternalModule],
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule {}
