import { Test, TestingModule } from '@nestjs/testing';
import { CentralApiController } from './central-api.controller';
import { CentralApiService } from './central-api.service';

describe('CentralApiController', () => {
  let centralApiController: CentralApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CentralApiController],
      providers: [CentralApiService],
    }).compile();

    centralApiController = app.get<CentralApiController>(CentralApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(centralApiController.getHello()).toBe('Hello World!');
    });
  });
});
