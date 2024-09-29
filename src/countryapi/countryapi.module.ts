import { HttpStatus, Module } from '@nestjs/common';
import { CountryapiController } from './countryapi.controller';
import { CountryapiService } from './countryapi.service';

@Module({
  controllers: [CountryapiController],
  providers: [CountryapiService],
})
export class CountryapiModule {}
