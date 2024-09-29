import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { CountryapiService } from './countryapi.service';

@Controller('countriesapi')
export class CountryapiController {
  constructor(private readonly countryapiService: CountryapiService) {}

  @Get('counrty')
  async generateContent() {
    return await this.countryapiService.generateContent();
  }
}
