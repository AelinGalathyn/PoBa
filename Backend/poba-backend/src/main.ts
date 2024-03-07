import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({path: `${__dirname}/../.env`});

console.log(__dirname);
console.log('DB_DATABASE', process.env['DB_DATABASE']);
console.log('DB_PORT', process.env['DB_PORT']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
