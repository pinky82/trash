import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('wechat')
@Controller('wechat')
export class WechatController {
  constructor(private readonly wechatService: WechatService) {}

  @Get('login')
  @ApiOperation({ summary: '微信登录' })
  @ApiQuery({ name: 'code', description: '微信登录code' })
  @ApiResponse({ status: 200, description: '登录成功' })
  async login(@Query('code') code: string) {
    try {
      const openid = await this.wechatService.getOpenId(code);
      const token = this.wechatService.generateToken(openid);
      return {
        token,
        openid
      };
    } catch (error) {
      throw new UnauthorizedException('微信登录失败');
    }
  }

  @Get('user-info')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiQuery({ name: 'openid', description: '用户openid' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getUserInfo(@Query('openid') openid: string) {
    try {
      const accessToken = await this.wechatService.getAccessToken();
      return await this.wechatService.getUserInfo(openid, accessToken);
    } catch (error) {
      throw new UnauthorizedException('获取用户信息失败');
    }
  }
} 