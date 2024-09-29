import { Test, TestingModule } from '@nestjs/testing';
import { CountryapiService } from './countryapi.service';

describe('CountryapiService', () => {
  let service: CountryapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryapiService],
    }).compile();

    service = module.get<CountryapiService>(CountryapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
