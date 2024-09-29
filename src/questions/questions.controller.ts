import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './question-entity';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/user/decorator/curent-user-decorator';
import { User } from 'src/user/user-entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guards';
import { Roles } from 'src/quizzes/decoraters/role-decorator';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Create Question' })
  @ApiBody({ type: CreateQuestionDto })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @CurrentUser() currentUser: User,
  ): Promise<Question> {
    return await this.questionsService.createQuestion(
      createQuestionDto,
      currentUser,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  async findAll(): Promise<Question[]> {
    return await this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  async findID(@Param('id') id: string): Promise<Question> {
    return await this.questionsService.findID(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update question by ID' })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @CurrentUser() currentUser: User,
  ): Promise<Question> {
    return await this.questionsService.update(
      id,
      updateQuestionDto,
      currentUser,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete question by ID' })
  async Remove(@Param('id') id: string): Promise<void> {
    return await this.questionsService.remove(id);
  }
}
