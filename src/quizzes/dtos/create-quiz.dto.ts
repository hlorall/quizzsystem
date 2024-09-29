import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsString()
  @Length(3, 500)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'created_at' })
  created_at: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'created_by',
  })
  created_by: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the user who last updated the quiz',
  })
  updated_by: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'updated_at' })
  updated_at: Date;
}
