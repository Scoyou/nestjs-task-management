import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: 'https://5bcceabaa53f4f859a3d52d369fe7339@o451084.ingest.sentry.io/5480645',
  });
  
  const port = 3000
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
