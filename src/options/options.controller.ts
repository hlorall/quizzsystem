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
import { CreateOptionDto } from './dtos/create-option.dto';
import { Option } from './option-entity';
import { OptionsService } from './options.service';
import { UpdateOptionDto } from './dtos/update-option.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guards';
import { Roles } from 'src/quizzes/decoraters/role-decorator';
import { CurrentUser } from 'src/user/decorator/curent-user-decorator';
import { User } from 'src/user/user-entity';
import { RolesGuard } from 'src/guards/user-guards';

@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private readonly OptionsService: OptionsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Create Option' })
  @ApiBody({ type: CreateOptionDto })
  async create(
    @Body() createOptionDto: CreateOptionDto,
    @CurrentUser() currentUser: User,
  ): Promise<Option> {
    return await this.OptionsService.createOption(createOptionDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get All option' })
  async findAll(): Promise<Option[]> {
    return await this.OptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get response by ID' })
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param('id') id: string) {
    return await this.OptionsService.findID(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete option by id' })
  @ApiParam({ name: 'id', required: true })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.OptionsService.remove(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update option by id' })
  async update(
    @Param('id') id: string,
    @Body() updateOptionDto: UpdateOptionDto,
    @CurrentUser() currentUser: User,
  ): Promise<Option> {
    return await this.OptionsService.update(id, updateOptionDto, currentUser);
  }
}
