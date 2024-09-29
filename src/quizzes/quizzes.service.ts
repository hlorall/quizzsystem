import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user-entity';
import { In, Repository } from 'typeorm';
import { Quiz } from './quiz-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { UpdatesQuizDto } from './dtos/update-quiz.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private QuizRepo: Repository<Quiz>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createQuiz(
    createQuizDto: CreateQuizDto,
    currentUser: User,
  ): Promise<Quiz> {
    // console.log('Current User:', currentUser);
    // const createdBy = await this.userRepo.findOne({
    //   where: { id: currentUser.id },
    // });

    // console.log('Created By:', createdBy);

    const quiz = this.QuizRepo.create({
      ...createQuizDto,
      created_by: (currentUser as any).sub,
      updated_by: (currentUser as any).sub,
    });

    return this.QuizRepo.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return await this.QuizRepo.find();
  }

  async findID(id: string): Promise<Quiz> {
    const quiz = await this.QuizRepo.findOne({
      where: { id },
    });
    return quiz;
  }

  async Remove(id: string): Promise<void> {
    const quiz = await this.findID(id);
    await this.QuizRepo.remove(quiz);
  }

  async updateQuiz(
    id: string,
    updateQuizDto: UpdatesQuizDto,
    currentUser: User,
  ): Promise<Quiz> {
    const quiz = await this.findID(id);
    const updatedQuiz = this.QuizRepo.merge(quiz, {
      ...updateQuizDto,
      updated_by: (currentUser as any).sub,
    });

    return this.QuizRepo.save(updatedQuiz);
  }

  async deleteAll(): Promise<void> {
    await this.QuizRepo.delete({});
  }

}
