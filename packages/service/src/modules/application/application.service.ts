import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationStatus } from '@trash/types';
@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, openid: string) {
    const application = this.applicationRepository.create({
      ...createApplicationDto,
      openid,
    });
    return this.applicationRepository.save(application);
  }

  async findAll() {
    return this.applicationRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(`申请 #${id} 不存在`);
    }
    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.findOne(id);
    Object.assign(application, updateApplicationDto);
    return this.applicationRepository.save(application);
  }

  async approve(id: number, approverId: number, reason?: string) {
    return this.update(id, {
      status: ApplicationStatus.APPROVED,
      approverId,
      reason,
    });
  }

  async reject(id: number, approverId: number, reason: string) {
    return this.update(id, {
      status: ApplicationStatus.REJECTED,
      approverId,
      reason,
    });
  }

  async findByOpenidAndStatus(openid: string) {
    return this.applicationRepository.findOne({
      where: {
        openid
      },
    });
  }
} 