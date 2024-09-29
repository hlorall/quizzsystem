import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz-entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), UserModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [TypeOrmModule],
})
export class QuizzesModule {}
