import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocationDto } from './dto/location.dto';
import { SearchCommunityDto } from './dto/search-community.dto';

@ApiTags('小区管理')
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建小区' })
  @ApiResponse({ status: 201, description: '创建成功' })
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有小区列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findAll(
    @Query() location?: LocationDto,
    @Query() searchParams?: SearchCommunityDto,
  ) {
    return this.communityService.findAll(location, searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定小区' })
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新小区信息' })
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communityService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除小区' })
  remove(@Param('id') id: string) {
    return this.communityService.remove(+id);
  }

  @Get('search/address')
  @ApiOperation({ summary: '根据地址搜索小区' })
  searchByAddress(@Body('address') address: string) {
    return this.communityService.searchByAddress(address);
  }
} 