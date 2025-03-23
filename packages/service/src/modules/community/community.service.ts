import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Community } from './entities/community.entity';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { LocationDto } from './dto/location.dto';
import { SearchCommunityDto } from './dto/search-community.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async findAll(location?: LocationDto, searchParams?: SearchCommunityDto) {
    const queryBuilder = this.communityRepository.createQueryBuilder('community');

    // 添加搜索条件
    if (searchParams?.name) {
      queryBuilder.andWhere('community.name LIKE :name', {
        name: `%${searchParams.name}%`,
      });
    }

    if (searchParams?.address) {
      queryBuilder.andWhere('community.address LIKE :address', {
        address: `%${searchParams.address}%`,
      });
    }

    console.log(location)

    // 如果有位置信息，计算距离并排序
    if (location) {
      // 使用 Haversine 公式计算距离（单位：公里）
      queryBuilder
        .addSelect(
          `(
            6371 * acos(
              cos(radians(:latitude)) * cos(radians(community.latitude)) *
              cos(radians(community.longitude) - radians(:longitude)) +
              sin(radians(:latitude)) * sin(radians(community.latitude))
            )
          )`,
          'distance'
        )
        .setParameter('latitude', location.latitude)
        .setParameter('longitude', location.longitude)
        .orderBy('distance', 'ASC');
    }

    const communities = await queryBuilder.getRawAndEntities();
    
    // 处理查询结果，确保返回正确的格式
    return communities.entities.map((community, index) => {
      const raw = communities.raw[index];
      return {
        ...community,
        distance: location ? Number(raw.distance.toFixed(2)) : undefined
      };
    });
  }

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const community = this.communityRepository.create(createCommunityDto);
    return this.communityRepository.save(community);
  }

  async findOne(id: number): Promise<Community> {
    const community = await this.communityRepository.findOne({ where: { id } });
    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }
    return community;
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto): Promise<Community> {
    await this.communityRepository.update(id, updateCommunityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.communityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }
  }

  async searchByAddress(address: string): Promise<Community[]> {
    return this.communityRepository
      .createQueryBuilder('community')
      .where('community.address ILIKE :address', { address: `%${address}%` })
      .getMany();
  }

  // 使用 Haversine 公式计算两点之间的距离（单位：公里）
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // 地球半径（公里）
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
} 