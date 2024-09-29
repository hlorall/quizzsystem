import { 
    IsBoolean,
    IsNotEmpty, 
    IsString, 
    } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
     

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'question_id'})
    question_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'option_text'})
    option_text: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'is_correct'})
    is_correct: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'is_correct'})
    created_by: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'created_at'})
    created_at: Date;

    @IsString()
    @ApiProperty({type: String, description: 'updated_by'})
    updated_by: string;


}