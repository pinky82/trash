import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, IsOptional, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '手机号',
    example: '13800138000'
  })
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^1[3-9]\d{9}$/, { message: '请输入正确的手机号' })
  phone: string;

  @ApiProperty({
    description: '密码',
    example: '123456'
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Matches(/^[a-zA-Z0-9]{6,20}$/, { message: '密码长度必须在6-20位之间，只能包含字母和数字' })
  password: string;

  @ApiPropertyOptional({
    description: '用户姓名',
    example: '张三',
    minLength: 2,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: '姓名不能为空' })
  @MinLength(2, { message: '姓名长度不能小于2个字符' })
  @MaxLength(20, { message: '姓名长度不能超过20个字符' })
  name?: string;
} 