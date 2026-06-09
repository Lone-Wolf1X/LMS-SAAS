import { Controller, Get } from '@nestjs/common';
import { CentralApiService } from './central-api.service';

@Controller()
export class CentralApiController {
  constructor(private readonly centralApiService: CentralApiService) {}

  @Get()
  getHello(): string {
    return this.centralApiService.getHello();
  }
}
