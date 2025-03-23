import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '用户ID' })
  id: number;

  @Column({ length: 20, unique: true, nullable: false })
  @ApiProperty({ description: '手机号' })
  phone: string;

  @Column({ length: 100, nullable: false })
  @ApiProperty({ description: '密码' })
  password: string;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: '用户名' })
  name: string;

  @Column({ length: 255, nullable: true })
  @ApiProperty({ description: '头像URL' })
  avatar: string;

  @Column({ default: false })
  @ApiProperty({ description: '是否为回收员' })
  isRecycler: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 