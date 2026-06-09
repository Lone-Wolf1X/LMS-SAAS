import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class UpdaterService {
  private readonly logger = new Logger(UpdaterService.name);
  private currentVersion = '1.0.0'; // Should ideally be read from package.json or DB

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkForUpdates() {
    this.logger.log('Checking Central Hub for new updates...');
    const hubUrl = this.configService.get<string>('CENTRAL_HUB_URL') || 'http://localhost:3000';

    try {
      const response = await lastValueFrom(this.httpService.get(`${hubUrl}/api/patches/latest`));
      const latestPatch = response.data;

      if (latestPatch && latestPatch.version !== this.currentVersion) {
        this.logger.log(`New update found! Version: ${latestPatch.version}`);
        
        // TODO: Download patch zip, verify checksum, unzip, and apply
        // For now, simulating the update process
        if (latestPatch.isCritical) {
          this.logger.warn('Critical update! Triggering auto-update sequence...');
          await this.applyUpdate(latestPatch);
        } else {
          this.logger.log('Update is optional. IT Admin can apply it via the panel.');
        }
      } else {
        this.logger.log('System is up to date.');
      }
    } catch (error) {
      this.logger.error('Failed to check for updates.', error.message);
    }
  }

  async applyUpdate(patch: any) {
    this.logger.log(`Starting update process for version ${patch.version}`);
    
    // Simulate bash script logic for OTA patch application
    try {
      this.logger.log('1. Downloading patch...');
      // await execAsync(`wget -O patch.zip ${patch.fileUrl}`);
      
      this.logger.log('2. Extracting patch...');
      // await execAsync(`unzip patch.zip -d ./updates`);
      
      this.logger.log('3. Running migrations...');
      // await execAsync(`npm run migration:run`);
      
      this.logger.log('4. Restarting service (PM2/Docker)...');
      // await execAsync(`pm2 reload client-api`);
      
      this.currentVersion = patch.version;
      this.logger.log('Update applied successfully!');
    } catch (error) {
      this.logger.error(`Update failed: ${error.message}`);
      // Push error log back to Central Hub
      this.reportErrorToHub(error);
    }
  }

  async reportErrorToHub(error: any) {
    const hubUrl = this.configService.get<string>('CENTRAL_HUB_URL') || 'http://localhost:3000';
    try {
      await lastValueFrom(this.httpService.post(`${hubUrl}/api/logs/error`, {
        error: error.message,
        stack: error.stack,
        tenantDomain: this.configService.get<string>('TENANT_DOMAIN'),
        timestamp: new Date()
      }));
    } catch (e) {
      this.logger.error('Failed to sync error log to Central Hub.', e.message);
    }
  }
}
