import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config({path: `${__dirname}/../.env`});

console.log(__dirname);
console.log('DB_DATABASE', process.env['DB_DATABASE']);
console.log('DB_PORT', process.env['DB_PORT']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('Dokumentáció a PoBa projekt API endpontjaihoz.')
    .setVersion('3.0')
    .addTag('PoBa APIk')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
