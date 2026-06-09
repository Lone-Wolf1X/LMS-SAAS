import { NestFactory } from '@nestjs/core';
import { ClientApiModule } from './client-api.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { UpdaterService } from './updater/updater.service';

async function bootstrap() {
  const app = await NestFactory.create(ClientApiModule);
  
  // Register Global Exception Filter
  const updaterService = app.get(UpdaterService);
  app.useGlobalFilters(new GlobalExceptionFilter(updaterService));

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
