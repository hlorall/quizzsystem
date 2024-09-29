import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GeminiService],
  controllers: [GeminiController],
  exports: [HttpModule],
})
export class GeminiModule {}
