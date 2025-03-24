import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { CreateOrderDto as ICreateOrderDto, OrderFrequency, OrderMethod } from '@trash/types';

export class CreateOrderDto implements ICreateOrderDto {
  @IsString()
  @IsNotEmpty({ message: '楼道号不能为空' })
  building: string;

  @IsString()
  @IsNotEmpty({ message: '门牌号不能为空' })
  room: string;

  @IsNumber()
  @IsNotEmpty({ message: '小区ID不能为空' })
  communityId: number;

  @IsEnum(OrderFrequency)
  @IsNotEmpty({ message: '上门频率不能为空' })
  frequency: OrderFrequency;

  @IsString()
  @IsNotEmpty({ message: '服务时间不能为空' })
  serviceTime: string;

  @IsEnum(OrderMethod)
  @IsNotEmpty({ message: '上门方式不能为空' })
  method: OrderMethod;

  @ValidateIf(o => o.frequency === OrderFrequency.SPECIFIED_DATE)
  @IsNotEmpty({ message: '指定服务日期不能为空' })
  specifiedDate?: Date;

  @ValidateIf(o => o.frequency === OrderFrequency.REGULAR)
  @IsString()
  @IsNotEmpty({ message: '周期时间不能为空' })
  cycleDays?: string;

  @IsString()
  @IsNotEmpty({ message: '创建人openid不能为空' })
  creatorOpenid: string;
} 