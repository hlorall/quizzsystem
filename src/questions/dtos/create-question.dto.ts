import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'quiz_id' })
  quiz_id: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: Array, description: 'options' })
  question_text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'question_type' })
  question_type: 'multiple_choice' | 'true_false';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'created_by' })
  created_by: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'created_at' })
  created_at: Date;

  @IsString()
  @ApiProperty({ type: String, description: 'updated_by' })
  updated_by: string;
}
