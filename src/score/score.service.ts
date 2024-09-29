import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './score-entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quizzes/quiz-entity';
import { User } from 'src/user/user-entity';
import { UpdatedScoreDto } from './dto/update-score.dto';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,

    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,

    @InjectRepository(User)
    private userRepository: Repository<Quiz>,
  ) {}

  async createScore(
    createScoreDto: CreateScoreDto,
    currentUser: User,
  ): Promise<Score> {
    const { user_id, quiz_id, score } = createScoreDto;

    const quiz = await this.quizRepository.findOne({ where: { id: quiz_id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quiz_id} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const scoreEntity = this.scoreRepository.create({
      ...createScoreDto,
      score,
      created_by: (currentUser as any).sub,
      updated_by: (currentUser as any).sub,
    });

    return this.scoreRepository.save(scoreEntity);
  }

  async getScore(quiz_id: string, user_id: string): Promise<Score> {
    const quiz = await this.quizRepository.findOne({ where: { id: quiz_id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quiz_id} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const score = await this.scoreRepository.findOne({
      where: { quiz_id, user_id },
    });
    if (!score) {
      throw new NotFoundException(
        `Score not found for quiz with ID ${quiz_id} and user with ID ${user_id}`,
      );
    }

    return score;
  }

  async findAll(): Promise<Score[]> {
    return await this.scoreRepository.find();
  }

  async findID(id: string): Promise<Score> {
    const score = await this.scoreRepository.findOne({ where: { id } });
    if (!score) {
      throw new NotFoundException(`Score not found`);
    }
    return score;
  }

  async Remove(id: string): Promise<void> {
    await this.scoreRepository.delete(id);
  }

  async update(
    id: string,
    updateScoreDto: UpdatedScoreDto,
    currentUser: User,
  ): Promise<Score> {
    const score = await this.findID(id);
    if (!score) {
      throw new NotFoundException('Score not found');
    }

    score.updated_by = (currentUser as any).sub;
    Object.assign(score, updateScoreDto);

    return await this.scoreRepository.save(score);
  }
}
