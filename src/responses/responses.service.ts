import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/question-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { User } from 'src/user/user-entity';
import { Repository } from 'typeorm';
import { Response } from './response-entity';
import { Option } from 'src/options/option-entity';
import { CreateResponseDto } from './dtos/create-responses.dto';
import { UpdateResponseDto } from './dtos/update-responses.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,

    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async createResponse(
    createResponseDto: CreateResponseDto,
    currentUser: User,
  ): Promise<Response> {
    const { user_id, quiz_id, question_id, selected_option_id } =
      createResponseDto;
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    console.log(user);
    const quiz = await this.quizRepository.findOne({ where: { id: quiz_id } });
    console.log(quiz);
    const question = await this.questionRepository.findOne({
      where: { id: question_id },
    });
    console.log(question);
    const option = await this.optionRepository.findOne({
      where: { id: selected_option_id },
    });
    console.log(option);

    const response = this.responsesRepository.create({
      ...createResponseDto,
      created_by: (currentUser as any).sub,
      updated_by: (currentUser as any).sub,
    });

    return this.responsesRepository.save(response);
  }

  async findAll(): Promise<Response[]> {
    return await this.responsesRepository.find();
  }

  async findID(id: string): Promise<Response> {
    const response = await this.responsesRepository.findOne({ where: { id } });
    return response;
  }

  async Remove(id: string): Promise<void> {
    await this.responsesRepository.delete(id);
    return;
  }

  async update(
    id: string,
    updateResponseDto: UpdateResponseDto,
    currentUser: any,
  ): Promise<Response> {
    const quiz = await this.findID(id);
    if (!quiz) {
      throw new NotFoundException('Response not found');
    }

    quiz.updated_by = (currentUser as any).sub;
    Object.assign(quiz.id, updateResponseDto);

    return await this.responsesRepository.save(quiz);
  }
}
