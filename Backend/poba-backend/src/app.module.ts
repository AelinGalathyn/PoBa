import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql', // type of our database
    host: 'poba-project-server.mysql.database.azure.com', // database host
    port: 3306, // database host port
    username: 'izizvdeqos', // username
    password: 'SYW8433LFY7EPV7K$', // user password
    database: 'poba-project-database', // name of our database,
    entities: [], // entities go here
    synchronize: true, // if true, TypeORM will automatically create the database schema based on your models
  }), DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
