import {
  isNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNotEmpty,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdatesQuizDto {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsString()
  @IsOptional()
  @Length(3, 700)
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'updated_by' })
  updated_by: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'updated_at' })
  updated_at: Date;
}
