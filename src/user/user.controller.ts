import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Req,
  BadRequestException,
  Res,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user-entity.dto';
import { User } from './user-entity';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { I18nService } from 'nestjs-i18n';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('user')
@Controller('user')
// @UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private AuthService: AuthService,
    private JwtService: JwtService,
    private i18n: I18nService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Signup' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto) {
      throw new BadRequestException('Request body is missing');
    }
    const { email, username, password, role, created_by } = createUserDto;

    if (!['student', 'admin'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    try {
      return await this.AuthService.signup(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post('/signin')
  @ApiCreatedResponse({ description: 'User Signin' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  async signin(
    @Body() { email, password }: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.AuthService.signin(email, password);

    if (!accessToken) {
      throw new BadRequestException('Invalid credentials');
    }

    response.cookie('accessToken', accessToken, { httpOnly: true });

    return { accessToken };
  }

  @Post('/signout')
  @ApiOperation({ summary: 'Sign out the current user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully signed out' })
  async signout(@Res() response: Response): Promise<void> {
    await this.AuthService.signout(response);
    response.status(200).json({ message: 'Successfully signed out' });
  }

  @Get('/whoami')
  @ApiOperation({ summary: 'Get the current user' })
  async whoami(@Req() request: Request): Promise<{ email: string }> {
    const accessToken = request.cookies['accessToken'];

    if (!accessToken) {
      const errorMessage = await this.i18n.translate('test.NO_TOKEN_FOUND');
      throw new BadRequestException(errorMessage);
    }
    try {
      const data = await this.JwtService.verifyAsync(accessToken);
      const user = await this.userService.findOne(data.sub);
      return { email: user.email };
    } catch (error) {
      const errorMessage = await this.i18n.translate('test.EXPIRED_TOKEN');
      throw new BadRequestException(errorMessage);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new BadRequestException(
        await this.i18n.translate('test.NO_TOKEN_FOUND'),
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', required: true })
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }
}
