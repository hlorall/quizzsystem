import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user-entity';
import { CreateUserDto } from './dtos/user-entity.dto';
import { IsEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, username: string, password: string, role: string,): Promise<User> {
      const user = this.userRepository.create( {email, username, password, role});      
      return await this.userRepository.save(user);
    
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  find(email: string) {
    return this.userRepository.find({ where: { email } });
  }
}
