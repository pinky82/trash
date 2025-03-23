import Taro from '@tarojs/taro';
import env from '../config/env';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: any;
}

const BASE_URL = env.API_URL;

class Request {
  private static instance: Request;
  private token: string = '';

  private constructor() {
    // 从本地存储获取token
    this.token = Taro.getStorageSync('token') || '';
  }

  public static getInstance(): Request {
    if (!Request.instance) {
      Request.instance = new Request();
    }
    return Request.instance;
  }

  public setToken(token: string) {
    this.token = token;
    Taro.setStorageSync('token', token);
  }

  public getToken(): string {
    return this.token;
  }

  public async request<T>(options: RequestOptions): Promise<T> {
    const { url, method = 'GET', data, header = {} } = options;

    // 添加token到header
    if (this.token) {
      header['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await Taro.request({
        url: `${BASE_URL}${url}`,
        method,
        data,
        header: {
          'Content-Type': 'application/json',
          ...header,
        },
      });

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.data as T;
      }

      // 处理错误
      if (response.statusCode === 401) {
        // token过期，清除token并跳转到登录页
        this.setToken('');
        Taro.navigateTo({ url: '/pages/profile/index' });
        throw new Error('未授权，请重新登录');
      }

      throw new Error(response.data.message || '请求失败');
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }

  // 封装常用请求方法
  public get<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'GET', data });
  }

  public post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'POST', data });
  }

  public put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'PUT', data });
  }

  public delete<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'DELETE', data });
  }
}

export const request = Request.getInstance(); 