import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patch } from './entities/patch.entity';

@Injectable()
export class PatchesService {
  constructor(
    @InjectRepository(Patch)
    private patchesRepository: Repository<Patch>,
  ) {}

  async createPatch(data: Partial<Patch>): Promise<Patch> {
    const patch = this.patchesRepository.create(data);
    return this.patchesRepository.save(patch);
  }

  async getLatestPatch(): Promise<Patch> {
    const patch = await this.patchesRepository.findOne({
      where: {},
      order: { releasedAt: 'DESC' },
    });

    if (!patch) {
      throw new NotFoundException('No patches available');
    }

    return patch;
  }

  async getAllPatches(): Promise<Patch[]> {
    return this.patchesRepository.find({ order: { releasedAt: 'DESC' } });
  }
}
