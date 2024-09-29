import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './response-entity';
import { User } from 'src/user/user-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { Question } from 'src/questions/question-entity';
import { Option } from 'src/options/option-entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response, User, Quiz, Question, Option]),
    UserModule,
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [TypeOrmModule],
})
export class ResponsesModule {}
