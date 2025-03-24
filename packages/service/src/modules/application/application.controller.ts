import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { WechatAuthGuard } from '../auth/guards/wechat-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(WechatAuthGuard)
  create(@Body() createApplicationDto: CreateApplicationDto, @CurrentUser('openid') openid: string) {
    return this.applicationService.create(createApplicationDto, openid);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  approve(
    @Param('id') id: string,
    @Req() req: Request,
    @Body('reason') reason?: string,
  ) {
    return this.applicationService.approve(+id, (req.user as any).id, reason);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard)
  reject(@Param('id') id: string, @Req() req: Request, @Body('reason') reason: string) {
    return this.applicationService.reject(+id, (req.user as any).id, reason);
  }
} 