import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './entities/license.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LicensesService {
  constructor(
    @InjectRepository(License)
    private licensesRepository: Repository<License>,
  ) {}

  async generateLicense(tenantName: string, tenantDomain: string, validityDays: number = 365, features: any = {}): Promise<License> {
    const key = `NGI-${uuidv4().substring(0, 8).toUpperCase()}-${uuidv4().substring(0, 8).toUpperCase()}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validityDays);

    const license = this.licensesRepository.create({
      key,
      tenantName,
      tenantDomain,
      expiryDate,
      features,
    });

    return this.licensesRepository.save(license);
  }

  async validateLicense(key: string, domain: string): Promise<{ valid: boolean; reason?: string; features?: any }> {
    const license = await this.licensesRepository.findOne({ where: { key } });

    if (!license) {
      throw new NotFoundException('License not found');
    }

    if (!license.isActive) {
      return { valid: false, reason: 'License is inactive' };
    }

    if (new Date() > license.expiryDate) {
      return { valid: false, reason: 'License has expired' };
    }

    if (license.tenantDomain !== domain) {
      return { valid: false, reason: 'Domain mismatch. This license is not registered for this domain.' };
    }

    return { valid: true, features: license.features };
  }

  findAll() {
    return this.licensesRepository.find();
  }
}
