import { request } from '../utils/request';
import { UserInfo, WechatLoginResponse } from '@/types/api';

export const userService = {
  async wechatLogin(code: string): Promise<WechatLoginResponse> {
    const response = await request.get<WechatLoginResponse>('/wechat/login', { code  });
    return response.data;
  },

  async getWechatUserInfo(openid: string): Promise<UserInfo> {
    const response = await request.get<UserInfo>('/wechat/user-info', { openid });
    return response.data;
  },
}; 