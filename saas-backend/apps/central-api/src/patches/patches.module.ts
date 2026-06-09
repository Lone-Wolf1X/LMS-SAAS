import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatchesService } from './patches.service';
import { PatchesController } from './patches.controller';
import { Patch } from './entities/patch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patch])],
  controllers: [PatchesController],
  providers: [PatchesService],
})
export class PatchesModule {}
