import { request } from '../utils/request';
import { ApiResponse, WechatLoginResponse, UserInfo } from '../types/api';
import Taro from '@tarojs/taro';
import { BASE_URL } from '../config';

class ApiService {
  // 微信相关接口
  public static async wechatLogin(code: string): Promise<ApiResponse<WechatLoginResponse>> {
    return request.get<ApiResponse<WechatLoginResponse>>('/wechat/login', { code });
  }

  public static async getUserInfo(openid: string): Promise<ApiResponse<UserInfo>> {
    return request.get<ApiResponse<UserInfo>>('/wechat/user-info', { openid });
  }

  // 用户相关接口
  public static async getUserProfile(): Promise<ApiResponse<UserInfo>> {
    return request.get<ApiResponse<UserInfo>>('/user/profile');
  }

  // 其他接口可以在这里添加...
}

interface Location {
  latitude: number;
  longitude: number;
}

export interface Community {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  // 其他社区属性...
}

export const communityApi = {
  // 获取社区列表
  getCommunities: async (location?: Location) => {
    try {
      const url = `${BASE_URL}/communities`;
      const params = location ? `?latitude=${location.latitude}&longitude=${location.longitude}` : '';
      
      const response = await Taro.request({
        url: url + params,
        method: 'GET',
      });

      if (response.statusCode === 200) {
        return response.data as Community[];
      }
      throw new Error('获取社区列表失败');
    } catch (error) {
      console.error('获取社区列表错误:', error);
      throw error;
    }
  },
};

export default ApiService; 