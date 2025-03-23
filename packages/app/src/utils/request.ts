import Taro from '@tarojs/taro';
import { BASE_URL } from '../config';
import { ApiResponse } from '../services/types';

interface RequestOptions extends Omit<Taro.request.Option, 'url'> {
  url: string;
  skipAuth?: boolean; // 是否跳过认证
}

class Request {
  private static instance: Request;
  private token: string | null = null;

  private constructor() {
    // 从本地存储获取token
    const token = Taro.getStorageSync('token');
    if (token) {
      this.token = token;
    }
  }

  public static getInstance(): Request {
    if (!Request.instance) {
      Request.instance = new Request();
    }
    return Request.instance;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: any): Promise<ApiResponse<T>> {
    if (!response) {
      throw new Error('网络请求失败');
    }

    const { statusCode, data } = response;

    if (statusCode >= 200 && statusCode < 300) {
      return data;
    }

    // 处理401未授权的情况
    if (statusCode === 401) {
      // 清除token
      this.token = null;
      Taro.removeStorageSync('token');
      
      // 跳转到登录页
      Taro.navigateTo({
        url: '/pages/login/index'
      });
      
      throw new Error('登录已过期，请重新登录');
    }

    throw new Error(data?.message || '请求失败');
  }

  public async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      const response = await Taro.request({
        url: `${BASE_URL}${url}${queryString}`,
        method: 'GET',
        header: this.getHeaders()
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET请求错误:', error);
      throw error;
    }
  }

  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await Taro.request({
        url: `${BASE_URL}${url}`,
        method: 'POST',
        header: this.getHeaders(),
        data
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST请求错误:', error);
      throw error;
    }
  }

  public async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await Taro.request({
        url: `${BASE_URL}${url}`,
        method: 'PATCH',
        header: this.getHeaders(),
        data
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PATCH请求错误:', error);
      throw error;
    }
  }

  public setToken(token: string): void {
    this.token = token;
    Taro.setStorageSync('token', token);
  }

  public getToken(): string | null {
    return this.token || Taro.getStorageSync('token');
  }

  public clearToken(): void {
    this.token = null;
    Taro.removeStorageSync('token');
  }

  // 请求拦截器
  private requestInterceptor(options: RequestOptions): RequestOptions {
    // 添加基础URL
    options.url = `${BASE_URL}${options.url}`;

    // 添加通用headers
    options.header = {
      'Content-Type': 'application/json',
      ...options.header,
    };

    // 添加认证信息
    if (!options.skipAuth && this.token) {
      options.header.Authorization = `Bearer ${this.token}`;
    }

    return options;
  }

  // 响应拦截器
  private responseInterceptor(response: Taro.request.SuccessCallbackResult<any>) {
    // 处理401未授权
    if (response.statusCode === 401) {
      this.clearToken();
      throw new Error('未授权，请重新登录');
    }

    // 处理其他错误
    if (response.statusCode !== 200 && response.statusCode !== 201) {
      throw new Error(response.data?.message || '请求失败');
    }

    return response;
  }

  // 统一请求方法
  public async request<T = any>(options: RequestOptions): Promise<T> {
    try {
      // 请求拦截
      const interceptedOptions = this.requestInterceptor(options);

      // 发起请求
      const response = await Taro.request(interceptedOptions);

      // 响应拦截
      const interceptedResponse = this.responseInterceptor(response);

      return interceptedResponse.data;
    } catch (error) {
      console.error('请求错误:', error);
      throw error;
    }
  }
}

export const request = Request.getInstance(); 