import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WechatAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const openid = request.headers['x-wx-openid'];

    if (!openid) {
      throw new UnauthorizedException('未授权访问');
    }

    // 将 openid 添加到请求对象中，供后续使用
    request.user = { openid };
    return true;
  }
} 