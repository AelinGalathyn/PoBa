import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webshop } from './entities/webshop.entity';
import { WebshopService } from './webshop.service';
import { UsersModule } from '../users/users.module';
import { ExternalModule } from '../external/external.module';
import { AuthModule } from '../auth/auth.module';
import { WebshopController } from './webshop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Webshop]), UsersModule, forwardRef(() => ExternalModule)],
  providers: [WebshopService],
  exports: [WebshopService],
  controllers: [WebshopController]
})
export class WebshopModule {}
