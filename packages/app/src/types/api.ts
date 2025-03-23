// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 微信登录响应
export interface WechatLoginResponse {
  token: string;
  openid: string;
}

// 用户信息
export interface UserInfo {
  openid: string;
  nickname: string;
  headimgurl: string;
  sex: number;
  country: string;
  province: string;
  city: string;
} 