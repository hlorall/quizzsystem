import { Controller, Post, Get, Param,Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user-entity.dto';
import { User } from './user-entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body.email, body.username, body.password, 'user');
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }
  
  

}
