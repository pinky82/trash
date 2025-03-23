import { Community, Location, ApiResponse } from './types';
import { request } from '../utils/request';

export interface SearchCommunityParams {
  name?: string;
  address?: string;
}

export const communityService = {
  /**
   * 获取社区列表
   * @param location 可选的位置信息
   * @param searchParams 可选的搜索参数
   */
  getCommunities: async (
    location?: Location,
    searchParams?: SearchCommunityParams
  ): Promise<ApiResponse<Community[]>> => {
    try {
      const params = new URLSearchParams();
      
      // 添加位置参数
      if (location) {
        params.append('latitude', location.latitude.toString());
        params.append('longitude', location.longitude.toString());
      }
      
      // 添加搜索参数
      if (searchParams?.name) {
        params.append('name', searchParams.name);
      }
      if (searchParams?.address) {
        params.append('address', searchParams.address);
      }
      
      const queryString = params.toString();
      const url = `/communities${queryString ? `?${queryString}` : ''}`;
      
      const response = await request.get<ApiResponse<Community[]>>(url);
      return response.data;
    } catch (error) {
      console.error('获取社区列表错误:', error);
      throw error;
    }
  },

  /**
   * 获取社区详情
   * @param id 社区ID
   */
  getCommunityDetail: async (id: number): Promise<ApiResponse<Community>> => {
    try {
      const response = await request.get<ApiResponse<Community>>(`/communities/${id}`);
      return response.data;
    } catch (error) {
      console.error('获取社区详情错误:', error);
      throw error;
    }
  }
}; 