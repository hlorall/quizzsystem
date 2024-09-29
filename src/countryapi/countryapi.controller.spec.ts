import { Test, TestingModule } from '@nestjs/testing';
import { CountryapiController } from './countryapi.controller';

describe('CountryapiController', () => {
  let controller: CountryapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryapiController],
    }).compile();

    controller = module.get<CountryapiController>(CountryapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
