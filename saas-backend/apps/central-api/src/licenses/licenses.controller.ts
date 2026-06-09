import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { LicensesService } from './licenses.service';

// TODO: Add SuperAdminAuthGuard later to protect these endpoints
@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post('generate')
  generateLicense(@Body() body: { tenantName: string; tenantDomain: string; validityDays?: number; features?: any }) {
    return this.licensesService.generateLicense(
      body.tenantName,
      body.tenantDomain,
      body.validityDays,
      body.features,
    );
  }

  @Post('validate')
  validateLicense(@Body() body: { key: string; domain: string }) {
    return this.licensesService.validateLicense(body.key, body.domain);
  }

  @Get()
  getAllLicenses() {
    return this.licensesService.findAll();
  }
}
