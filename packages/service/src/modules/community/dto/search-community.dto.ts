import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchCommunityDto {
  @ApiPropertyOptional({ 
    description: '小区名称关键词',
    minLength: 2,
    maxLength: 50,
    example: '阳光'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  name?: string;

  @ApiPropertyOptional({ 
    description: '小区地址关键词',
    minLength: 2,
    maxLength: 100,
    example: '浦东新区'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  address?: string;
} 