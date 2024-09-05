import { Module } from '@nestjs/common';
import { QizzesController } from './qizzes.controller';
import { QizzesService } from './qizzes.service';

@Module({
  controllers: [QizzesController],
  providers: [QizzesService]
})
export class QizzesModule {}
