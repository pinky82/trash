import { request } from '../utils/request';
import { ApiResponse, WechatLoginResponse, UserInfo } from '../types/api';

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

export default ApiService; 