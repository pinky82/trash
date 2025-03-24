import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UpdateOrderDto as IUpdateOrderDto, OrderStatus } from '@trash/types';

export class UpdateOrderDto implements IUpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsString()
  @IsOptional()
  workerOpenid?: string;
} 