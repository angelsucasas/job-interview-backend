import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import "reflect-metadata";
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });

  await app.listen(process.env.API_PORT);
}
bootstrap();
