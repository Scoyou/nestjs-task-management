import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { Logger } from '@nestjs/common'
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server')

  Sentry.init({
    dsn: 'https://5bcceabaa53f4f859a3d52d369fe7339@o451084.ingest.sentry.io/5480645',
  });
  
  const port = process.env.PORT || serverConfig.port
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
