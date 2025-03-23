import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  name?: string
} 