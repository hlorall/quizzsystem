import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'role' })
  role: 'student' | 'admin';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'updated_by' })
  updated_by: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'updated_at' })
  updated_at: Date;
}
