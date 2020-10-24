import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: 'https://5bcceabaa53f4f859a3d52d369fe7339@o451084.ingest.sentry.io/5480645',
  });
  
  await app.listen(3000);
}
bootstrap();
