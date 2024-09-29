import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'role' })
  role: 'student' | 'admin';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'created_by' })
  created_by: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'created_at' })
  created_at: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'updated_by' })
  updated_by: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'updated_at' })
  updated_at: Date;
}
