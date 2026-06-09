import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientConfigService implements OnModuleInit {
  private readonly logger = new Logger(ClientConfigService.name);
  private isLicenseValid = false;
  private activeFeatures = {};

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async onModuleInit() {
    await this.validateLicenseWithHub();
  }

  async validateLicenseWithHub() {
    const hubUrl = this.configService.get<string>('CENTRAL_HUB_URL') || 'http://localhost:3000';
    const licenseKey = this.configService.get<string>('TENANT_LICENSE_KEY');
    const tenantDomain = this.configService.get<string>('TENANT_DOMAIN');

    if (!licenseKey || !tenantDomain) {
      this.logger.error('CRITICAL: License Key or Tenant Domain is missing in .env');
      return;
    }

    try {
      this.logger.log(`Validating license key against Central Hub: ${hubUrl}`);
      const response = await lastValueFrom(
        this.httpService.post(`${hubUrl}/api/licenses/validate`, {
          key: licenseKey,
          domain: tenantDomain,
        }),
      );

      if (response.data.valid) {
        this.isLicenseValid = true;
        this.activeFeatures = response.data.features;
        this.logger.log('✅ License validated successfully. LMS-SIS is active.');
      } else {
        this.isLicenseValid = false;
        this.logger.error(`❌ License Validation Failed: ${response.data.reason}`);
        // Optionally, shut down the application or disable features if license is invalid
        // process.exit(1);
      }
    } catch (error) {
      this.logger.error('Failed to communicate with Central Hub for license validation.');
      this.logger.error(error.message);
    }
  }

  getIsLicenseValid(): boolean {
    return this.isLicenseValid;
  }
}
