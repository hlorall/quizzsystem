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
import { ResponsesService } from './responses.service';
import { Response } from './response-entity';
import { UpdateResponseDto } from './dtos/update-responses.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/user/decorator/curent-user-decorator';
import { User } from 'src/user/user-entity';
import { CreateResponseDto } from './dtos/create-responses.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guards';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('responses')
@Controller('responses')
export class ResponsesController {
  constructor(
    private responsesService: ResponsesService,
    private event: EventEmitter2,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Create Response' })
  async create(
    @Param('user_id') user_id: string,
    @Param('quiz_id') quiz_id: string,
    @Param('question_id') question_id: string,
    @Param('selected_option_id') selected_option_id: string,
    @Body() createResponseDto: CreateResponseDto,
    @CurrentUser() currentUser: User,
  ): Promise<Response> {
    return await this.responsesService.createResponse(
      createResponseDto,
      currentUser,
    );
  }


  @Get()
  @ApiOperation({ summary: 'Get all responses' })
  async findAll() {
    return await this.responsesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get response by ID' })
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param('id') id: string) {
    return await this.responsesService.findID(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete response by ID' })
  @ApiParam({ name: 'id', required: true })
  removeUser(@Param('id') id: string) {
    return this.responsesService.Remove(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update response by ID' })
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.responsesService.update(
      id,
      updateResponseDto,
      currentUser,
    );
  }
}
