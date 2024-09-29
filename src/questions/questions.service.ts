import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './question-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quizzes/quiz-entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { User } from 'src/user/user-entity';
import { UpdateQuestionDto } from './dtos/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    currentUser: User,
  ): Promise<Question> {
    const { quiz_id, question_text, question_type } = createQuestionDto;

    const quiz = await this.quizRepository.findOne({
      where: { id: quiz_id },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      created_by: (currentUser as any).sub,
      updated_by: (currentUser as any).sub,
      quiz,
    });

    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async findID(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
    currentUser: any,
  ): Promise<Question> {
    const question = await this.findID(id);
    if (!question) {
      throw new NotFoundException('Quiz not found');
    }

    question.updated_by = (currentUser as any).sub;
    question.updated_at = new Date();
    Object.assign(question.id, updateQuestionDto);

    return await this.questionRepository.save(question);
  }

  async remove(id: string): Promise<void> { 
    const question = await this.findID(id);
    await this.questionRepository.remove(question);
  }
}
