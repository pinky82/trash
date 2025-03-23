import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class WechatService {
  private readonly appId: string;
  private readonly appSecret: string;
  private readonly accessTokenKey = 'wechat:access_token';

  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {
    this.appId = this.configService.get('WECHAT_APP_ID');
    this.appSecret = this.configService.get('WECHAT_APP_SECRET');
  }

  async getAccessToken(): Promise<string> {
    // 先从 Redis 获取
    const cachedToken = await this.redisService.get(this.accessTokenKey);
    if (cachedToken) {
      return cachedToken;
    }

    // 如果 Redis 中没有，则从微信服务器获取
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`;
    const response = await axios.get(url);
    
    if (response.data.access_token) {
      // 将 token 存入 Redis，设置过期时间为 7000 秒（微信 token 有效期为 7200 秒）
      await this.redisService.set(this.accessTokenKey, response.data.access_token, 7000);
      return response.data.access_token;
    }

    throw new UnauthorizedException('Failed to get WeChat access token');
  }

  async getOpenId(code: string): Promise<string> {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`;
    const response = await axios.get(url);
    
    if (response.data.openid) {
      return response.data.openid;
    }

    throw new UnauthorizedException('Failed to get WeChat openid');
  }

  async getUserInfo(openid: string, accessToken: string): Promise<any> {
    const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=zh_CN`;
    const response = await axios.get(url);
    
    if (response.data.headimgurl) {
      return {
        openid: response.data.openid,
        nickname: response.data.nickname,
        headimgurl: response.data.headimgurl,
        sex: response.data.sex,
        country: response.data.country,
        province: response.data.province,
        city: response.data.city,
      };
    }

    throw new UnauthorizedException('Failed to get WeChat user info');
  }

  generateToken(openid: string): string {
    return this.jwtService.sign({ 
      openid,
      type: 'wechat'
    });
  }
} 