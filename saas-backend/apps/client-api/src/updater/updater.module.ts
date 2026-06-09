import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UpdaterService } from './updater.service';
import { UpdaterController } from './updater.controller';

@Module({
  imports: [HttpModule],
  controllers: [UpdaterController],
  providers: [UpdaterService],
  exports: [UpdaterService],
})
export class UpdaterModule {}
