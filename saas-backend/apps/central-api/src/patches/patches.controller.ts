import { Controller, Get, Post, Body } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { Patch } from './entities/patch.entity';

@Controller('patches')
export class PatchesController {
  constructor(private readonly patchesService: PatchesService) {}

  // For Superadmin to upload a new patch reference
  @Post()
  createPatch(@Body() data: Partial<Patch>) {
    return this.patchesService.createPatch(data);
  }

  // For Client Nodes to check if an update is available
  @Get('latest')
  getLatestPatch() {
    return this.patchesService.getLatestPatch();
  }

  // For Superadmin to see patch history
  @Get()
  getAllPatches() {
    return this.patchesService.getAllPatches();
  }
}
