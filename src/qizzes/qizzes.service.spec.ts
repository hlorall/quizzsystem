import { Test, TestingModule } from '@nestjs/testing';
import { QizzesService } from './qizzes.service';

describe('QizzesService', () => {
  let service: QizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QizzesService],
    }).compile();

    service = module.get<QizzesService>(QizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
