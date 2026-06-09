import { Injectable } from '@nestjs/common';

@Injectable()
export class CentralApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
