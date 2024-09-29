import { 
    IsString, 
    IsNumber,
    IsNotEmpty
    } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'user_id'})
    user_id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'quiz_id'})
    quiz_id: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({type: Number, description: 'score'})
    score: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'created_by'})
    created_by: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'created_at'})
    created_at: Date;


    @IsString()
    @ApiProperty({type: String, description: 'updated_by'})
    updated_by: string;
}