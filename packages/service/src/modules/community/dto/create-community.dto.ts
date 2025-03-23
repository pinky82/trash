import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsUrl, Min, Max } from 'class-validator';

export class CreateCommunityDto {
  @ApiProperty({ description: '小区名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '小区缩略图URL' })
  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ description: '纬度' })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({ description: '经度' })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({ description: '详细地址' })
  @IsString()
  @IsNotEmpty()
  address: string;
} 