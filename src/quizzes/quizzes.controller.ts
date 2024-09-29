import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Quiz } from './quiz-entity';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { UpdatesQuizDto } from './dtos/update-quiz.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/user-guards';
import { Roles } from './decoraters/role-decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guards';
import { CurrentUser } from 'src/user/decorator/curent-user-decorator';
import { User } from 'src/user/user-entity';
import { I18nService } from 'nestjs-i18n';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private QuizzesService: QuizzesService,
    private i18n: I18nService,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Create Quiz' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateQuizDto })
  async create(
    @Body() createQuizDto: CreateQuizDto,
    @CurrentUser() currentUser: User,
  ): Promise<Quiz> {
    try {
      if (!currentUser) {
        const errorMessage = await this.i18n.translate(
          'test.USER_NOT_AUTHENTICATED',
        );
        throw new UnauthorizedException(errorMessage);
      }

      return await this.QuizzesService.createQuiz(createQuizDto, currentUser);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      const internalErrorMessage = await this.i18n.translate(
        'test.UNEXPECTED_ERROR',
      );
      throw new InternalServerErrorException(internalErrorMessage);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get All Quizzes' })
  async findAll(): Promise<Quiz[]> {
    try {
      return await this.QuizzesService.findAll();
    } catch (error) {
      const errorMessage = await this.i18n.translate('test.UNEXPECTED_ERROR');
      throw new InternalServerErrorException(errorMessage);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Quiz by id' })
  async findID(@Param('id') id: string): Promise<Quiz> {
    try {
      return await this.QuizzesService.findID(id);
    } catch (error) {
      const errorMessage = await this.i18n.translate('test.UNEXPECTED_ERROR');
      throw new InternalServerErrorException(errorMessage);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Quiz by id' })
  async Remove(@Param('id') id: string): Promise<void> {
    try {
      await this.QuizzesService.Remove(id);
    } catch (error) {
      const errorMessage = await this.i18n.translate('test.UNEXPECTED_ERROR');
      throw new InternalServerErrorException(errorMessage);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update Quiz by id' })
  @ApiBody({ type: UpdatesQuizDto })
  async update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdatesQuizDto,
    @CurrentUser() currentUser: User,
  ): Promise<Quiz> {
    try {
      return await this.QuizzesService.updateQuiz(
        id,
        updateQuizDto,
        currentUser,
      );
    } catch (error) {
      const errorMessage = await this.i18n.translate('test.UNEXPECTED_ERROR');
      throw new InternalServerErrorException(errorMessage);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all quizzes' })
  async removeAll(): Promise<void> {
    return await this.QuizzesService.deleteAll();
  }
}
