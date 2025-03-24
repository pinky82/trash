import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApplicationStatus } from '@trash/types';

export class UpdateApplicationDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsNumber()
  @IsOptional()
  approverId?: number;

  @IsString()
  @IsOptional()
  reason?: string;
} 