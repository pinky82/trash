import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WechatService } from '../services/wechat.service';

@Injectable()
export class WechatAuthGuard implements CanActivate {
  constructor(private readonly wechatService: WechatService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-wx-openid'];
    
    if (!token) {
      throw new UnauthorizedException('未提供认证信息');
    }

    try {
      // 验证 token 并获取用户信息
      const userInfo = this.wechatService.verifyToken(token);
      
      if (!userInfo || !userInfo.openid) {
        throw new UnauthorizedException('无效的认证信息');
      }

      // 将用户信息添加到请求对象中，供后续使用
      request.user = userInfo;
      return true;
    } catch (error) {
      throw new UnauthorizedException('认证失败：' + error.message);
    }
  }
} 