import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option-entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Option]), QuestionsModule, UserModule],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [TypeOrmModule],
})
export class OptionsModule {}
