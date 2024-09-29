import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountryapiService {
  async generateContent(): Promise<any> {
    try {
      const response = await axios.get('https://countryapi.io/api/all', {
        params: {
          apikey: 'weZjchP2mzluNgEzSqH7sm6DY7OLJbq56wOHBvof',
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to generate content',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
