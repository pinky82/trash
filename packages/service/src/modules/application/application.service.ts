import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationStatus } from '@trash/types';

interface FindAllParams {
  page?: number;
  pageSize?: number;
  status?: ApplicationStatus;
}

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

  async findAll({ page = 1, pageSize = 10, status }: FindAllParams = {}) {
    const skip = (page - 1) * pageSize;

    const where = status ? { status } : {};

    const [data, total] = await Promise.all([
      this.applicationRepository.find({
        where,
        skip,
        take: pageSize,
        order: {
          createdAt: 'desc',
        },
      }),
      this.applicationRepository.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: number) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['user'],
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