import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('communities')
export class Community {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '小区ID' })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: '小区名称' })
  name: string;

  @Column({ length: 255 })
  @ApiProperty({ description: '小区缩略图URL' })
  thumbnail: string;

  @Column('decimal', { precision: 10, scale: 8 })
  @ApiProperty({ description: '纬度' })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  @ApiProperty({ description: '经度' })
  longitude: number;

  @Column({ length: 255 })
  @ApiProperty({ description: '详细地址' })
  address: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 