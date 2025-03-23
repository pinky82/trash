import Taro from '@tarojs/taro';
import ApiService from '../services/api';
import { request } from './request';

interface LoginResult {
  token: string;
  openid: string;
}

class WechatUtil {
  private static instance: WechatUtil;

  private constructor() {}

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
    try {
      // 获取登录code
      const { code } = await Taro.login();

      console.log('code', code);
      
      if (!code) {
        throw new Error('获取登录code失败');
      }

      // 调用后端登录接口
      const loginRes = await ApiService.wechatLogin(code);
      
      
      if (loginRes.code === 0) {
        // 保存token
        request.setToken(loginRes.data.token);
        
        return {
          token: loginRes.data.token,
          openid: loginRes.data.openid
        };
      }

      throw new Error(loginRes.message || '登录失败');
    } catch (error) {
      console.error('微信登录失败:', error);
      throw error;
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