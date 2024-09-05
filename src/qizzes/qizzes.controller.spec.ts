import { Test, TestingModule } from '@nestjs/testing';
import { QizzesController } from './qizzes.controller';

describe('QizzesController', () => {
  let controller: QizzesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QizzesController],
    }).compile();

    controller = module.get<QizzesController>(QizzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
