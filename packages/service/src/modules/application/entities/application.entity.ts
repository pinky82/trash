import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationStatus } from '@trash/types';

@Entity('applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '申请人姓名' })
  name: string;

  @Column({ comment: '申请人手机号' })
  phone: string;

  @Column({ comment: '申请人身份证号' })
  idCard: string;

  @Column({ comment: '申请人openid' })
  openid: string;

  @Column({ comment: '居住地址' })
  address: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
    comment: '申请状态'
  })
  status: ApplicationStatus;

  @Column({ nullable: true, comment: '审批人id' })
  approverId?: number;

  @Column({ nullable: true, comment: '审批理由' })
  reason?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 