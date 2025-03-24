import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Community } from '../../community/entities/community.entity';
import { Order, OrderFrequency, OrderMethod, OrderStatus } from '@trash/types';

@Entity('orders')
export class OrderEntity implements Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '楼道号' })
  building: string;

  @Column({ comment: '门牌号' })
  room: string;

  @ManyToOne(() => Community)
  community: Community;

  @Column({ comment: '小区ID' })
  communityId: number;

  @Column({
    type: 'enum',
    enum: OrderFrequency,
    default: OrderFrequency.NO_SERVICE,
    comment: '上门频率',
  })
  frequency: OrderFrequency;

  @Column({ comment: '服务时间' })
  serviceTime: string;

  @Column({
    type: 'enum',
    enum: OrderMethod,
    default: OrderMethod.NO_SERVICE,
    comment: '上门方式',
  })
  method: OrderMethod;

  @Column({ nullable: true, comment: '指定服务日期' })
  specifiedDate?: Date;

  @Column({ nullable: true, comment: '周期时间' })
  cycleDays?: string;

  @Column({ comment: '订单创建人openid' })
  creatorOpenid: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    comment: '订单状态',
  })
  status: OrderStatus;

  @Column({ nullable: true, comment: '接单人openid' })
  workerOpenid?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 