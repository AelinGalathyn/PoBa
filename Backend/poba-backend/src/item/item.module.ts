import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ExternalModule } from '../external/external.module';
import { WebshopModule } from '../webshop/webshop.module';

@Module({
  imports: [ExternalModule, WebshopModule],
  providers: [ItemService],
  exports: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
