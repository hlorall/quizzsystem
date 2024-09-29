import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user-entity';
import { CreateUserDto } from './dtos/user-entity.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    // @Inject(CACHE_MANAGER)
    // private readonly chcheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.created_by) {
      const createdByUser = await this.userRepository.findOne({
        where: { id: createUserDto.created_by },
      });
      if (!createdByUser) {
        throw new NotFoundException('Creator user not found');
      }
    }

    const user = this.userRepository.create({
      ...createUserDto,
      created_by: createUserDto.created_by,
    });

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // async findAll(): Promise<User[]> {
  //   await this.chcheManager.set('chached_item', { key: 32 });
  //   const chachedItem = await this.chcheManager.get('chached_item');
  //   console.log(chachedItem);
  //   return await this.userRepository.find();
  // }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  find(email: string) {
    return this.userRepository.find({ where: { email } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    return updatedUser;
  }
}
