import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option-entity';
import { Question } from 'src/questions/question-entity';
import { User } from 'src/user/user-entity';
import { CreateOptionDto } from './dtos/create-option.dto';
import { UpdateOptionDto } from './dtos/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionsRepository: Repository<Option>,

    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOption(
    createOptionDto: CreateOptionDto,
    currentUser: User,
  ): Promise<Option> {
    const { question_id, option_text, is_correct } = createOptionDto;

    const question = await this.questionRepository.findOne({
      where: { id: question_id },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const option = this.optionsRepository.create({
      ...createOptionDto,
      created_by: (currentUser as any).sub,
      updated_by: (currentUser as any).sub,
    });

    return this.optionsRepository.save(option);
  }

  async findAll(): Promise<Option[]> {
    return await this.optionsRepository.find();
  }

  async findID(id: string): Promise<Option> {
    const option = await this.optionsRepository.findOne({ where: { id } });
    if (!option) {
      throw new NotFoundException('Option not found');
    }
    return option;
  }

  async remove(id: string): Promise<void> {
    const option = await this.findID(id);
    await this.optionsRepository.remove(option);
  }

  async update(
    id: string,
    updateOptionDto: UpdateOptionDto,
    currentUser: any,
  ): Promise<Option> {
    const quiz = await this.findID(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    quiz.updated_by = (currentUser as any).sub;
    Object.assign(quiz.id, updateOptionDto);

    return await this.optionsRepository.save(quiz);
  }
}
