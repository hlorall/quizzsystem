import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score-entity';
import { User } from 'src/user/user-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Score, User, Quiz]), UserModule],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [TypeOrmModule],
})
export class ScoreModule {}
