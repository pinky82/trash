import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class LocationDto {
  @ApiProperty({ description: '纬度', example: 39.9042 })
  @IsNumber()
  // @IsNotEmpty()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({ description: '经度', example: 116.4074 })
  @IsNumber()
  // @IsNotEmpty()
  @Min(-180)
  @Max(180)
  longitude: number;
} 