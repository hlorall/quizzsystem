import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiService {
  private readonly apiKey: string = 'AIzaSyAUfKjlIjHM3_U3RiCeGC02jOvZoB1dmdk';
  private readonly baseURL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;

  constructor(private httpService: HttpService) {}

  async generateContent(prompt: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: 'Explain how AI works',
                },
              ],
            },
          ],
        },
        {
          params: {
            key: 'AIzaSyAUfKjlIjHM3_U3RiCeGC02jOvZoB1dmdk',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to generate content',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
