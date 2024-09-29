import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsArray,
    } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateOptionDto {

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: 'option_text'})
    option_text: string;

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: 'is_correct'})
    is_correct: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: 'question_id'})
    question_id: string;

    @IsOptional()
    @IsString()
    @ApiProperty({type: String, description: 'updated_by'})
    updated_by: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({type: Array, description: 'updated_at'})
    updated_at: Date;


}