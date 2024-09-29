import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score-entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/user/decorator/curent-user-decorator';
import { User } from 'src/user/user-entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guards';
import { CreateScoreDto } from './dto/create-score.dto';
import { RolesGuard } from 'src/guards/user-guards';
import { Roles } from 'src/quizzes/decoraters/role-decorator';
import { UpdatedScoreDto } from './dto/update-score.dto';

@ApiTags('score')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create score' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateScoreDto })
  async create(
    @Param('quiz_id') quiz_id: string,
    @Param('user_id') user_id: string,
    @Param('score') score: number,
    @Body() creates: CreateScoreDto,
    @CurrentUser() currentUser: User,
  ): Promise<Score> {
    return await this.scoreService.createScore(creates, currentUser);
  }

  @Get('/quiz')
  @ApiOperation({ summary: 'Get all scores by quiz' })
  @UseGuards(JwtAuthGuard)
  async getScoreByQuizAndUser(
    @Param('quiz_id') quiz_id: string,
    @Param('user_id') user_id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Score> {
    const score = await this.scoreService.getScore(quiz_id, user_id);
    if (!score) {
      throw new NotFoundException(
        `No score found for quiz ${quiz_id} and user ${user_id}`,
      );
    }
    return score;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete score by ID' })
  async removeScore(@Param('id') id: string): Promise<void> {
    await this.scoreService.Remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scores' })
  async findAll(): Promise<Score[]> {
    return await this.scoreService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update option by id' })
  async update(
    @Param('id') id: string,
    @Body() updateScoreDto: UpdatedScoreDto,
    @CurrentUser() currentUser: User,
  ): Promise<Score> {
    return await this.scoreService.update(id, updateScoreDto, currentUser);
  }
}
