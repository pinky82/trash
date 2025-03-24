import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApplicationStatus } from '@trash/types';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty({ message: '申请人姓名不能为空' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '申请人手机号不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '申请人身份证号不能为空' })
  idCard: string;

  @IsString()
  @IsNotEmpty({ message: '居住地址不能为空' })
  address: string;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus = ApplicationStatus.PENDING;
} 