import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
    
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({type: String, description: 'user_id'})
    user_id: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({type: String, description: 'quiz_id'})
    quiz_id: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({type: String, description: 'question_id'})
    question_id: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({type: String, description: 'selected_option_id'})
    selected_option_id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'created_by'})
    created_by: string;

    @IsString()
    @ApiProperty({type: String, description: 'updated_by'})
    updated_by: string;

    

}
