import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

interface WechatUserInfo {
  openid: string;
  nickname?: string;
  avatarUrl?: string;
}

@Injectable()
export class WechatService {
  constructor(private readonly configService: ConfigService) {}

  verifyToken(token: string): WechatUserInfo {
    try {
      // 使用 JWT 验证 token
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET')) as WechatUserInfo;
      
      // 验证必要的字段
      if (!decoded.openid) {
        throw new Error('Invalid token: missing openid');
      }

      return decoded;
    } catch (error) {
      throw new Error('Token verification failed: ' + error.message);
    }
  }

  generateToken(userInfo: WechatUserInfo): string {
    return jwt.sign(userInfo, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: '30d' // token 有效期 30 天
    });
  }
} 