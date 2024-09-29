import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question-entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { User } from 'src/user/user-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, User, Quiz]),
    QuizzesModule,
    UserModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [TypeOrmModule],
})
export class QuestionsModule {}
