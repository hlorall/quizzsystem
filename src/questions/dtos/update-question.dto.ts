import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({type: String, description: 'question_text'})
   question_text: string;

  @IsOptional()
  @IsEnum(['multiple_choice', 'true_false'])
  @ApiProperty({type: String, description: 'question_type'})
   question_type: 'multiple_choice' | 'true_false';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String, description: 'updated_by'})
   updated_by: string; 

  @IsOptional()
  @ApiProperty({type: String, description: 'quiz_id'})
   quiz_id: string;
}
