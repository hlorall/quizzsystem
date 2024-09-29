import { 
    IsOptional, 
    IsNumber,
    IsString,
    IsNotEmpty
    } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';  

export class UpdatedScoreDto {

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: 'user_id'})
    user_id: string;

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: 'quiz_id'})
    quiz_id: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({type: Number, description: 'score'})
    score: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'updated_by'})
    updated_by: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'updated_at'})
    updated_at: Date;

}