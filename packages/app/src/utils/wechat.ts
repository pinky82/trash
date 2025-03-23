import Taro from '@tarojs/taro';
import { request } from './request';
import { userService } from '@/services/user';

interface LoginResult {
  token: string;
  openid: string;
}

class WechatUtil {
  private static instance: WechatUtil;

  private constructor() { }

  public static getInstance(): WechatUtil {
    if (!WechatUtil.instance) {
      WechatUtil.instance = new WechatUtil();
    }
    return WechatUtil.instance;
  }

  /**
   * 微信登录
   * @returns Promise<LoginResult>
   */
  public async login(): Promise<LoginResult> {
    // 获取登录code
    const { code } = await Taro.login();
    console.log('code', code);
    // 调用后端登录接口
    const loginRes = await userService.wechatLogin(code);
    console.log('loginRes', loginRes);

    // 保存token
    request.setToken(loginRes.token);

    return {
      token: loginRes.token,
      openid: loginRes.openid
    }
  }

  /**
   * 检查登录状态
   * @returns boolean
   */
  public isLoggedIn(): boolean {
    return !!request.getToken();
  }

  /**
   * 退出登录
   */
  public logout(): void {
    request.setToken('');
    Taro.clearStorageSync();
  }
}

export const wechat = WechatUtil.getInstance(); 