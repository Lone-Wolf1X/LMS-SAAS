import { NestFactory } from '@nestjs/core';
import { CentralApiModule } from './central-api.module';

async function bootstrap() {
  const app = await NestFactory.create(CentralApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
