import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async generateContent(@Body('prompt') prompt: string) {
    console.log('Received prompt:', prompt);
    if (!prompt) {
      throw new BadRequestException('Prompt is required');
    }
    return this.geminiService.generateContent(prompt);
  }
}
