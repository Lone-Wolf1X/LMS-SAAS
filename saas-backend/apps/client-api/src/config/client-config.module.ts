import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientConfigService } from './client-config.service';

@Module({
  imports: [HttpModule],
  providers: [ClientConfigService],
  exports: [ClientConfigService],
})
export class ClientConfigModule {}
