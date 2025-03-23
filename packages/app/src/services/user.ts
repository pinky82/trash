import { User, ApiResponse, LoginResponse } from './types';
import { request } from '../utils/request';

export const userService = {
  /**
   * 用户登录
   * @param phone 手机号
   * @param password 密码
   */
  login: async (phone: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', {
        phone,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('登录错误:', error);
      throw error;
    }
  },

  /**
   * 用户注册
   * @param phone 手机号
   * @param password 密码
   * @param name 用户名
   */
  register: async (phone: string, password: string, name?: string): Promise<User> => {
    try {
      const response = await request.post<ApiResponse<User>>('/auth/register', {
        phone,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.error('注册错误:', error);
      throw error;
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: async (): Promise<User> => {
    try {
      const response = await request.get<ApiResponse<User>>('/users/profile');
      return response.data;
    } catch (error) {
      console.error('获取用户信息错误:', error);
      throw error;
    }
  },

  /**
   * 更新用户信息
   * @param data 用户信息
   */
  updateUserInfo: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await request.patch<ApiResponse<User>>('/users/profile', data);
      return response.data;
    } catch (error) {
      console.error('更新用户信息错误:', error);
      throw error;
    }
  }
}; 