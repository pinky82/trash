import { request } from '@/utils/request';
import { ApplicationStatus } from '@trash/types'

export interface User {
  id: number;
  name: string;
  openid: string;
}

export interface Community {
  id: number;
  name: string;
  address: string;
}

export interface Application {
  id: number;
  status: ApplicationStatus;
  reason?: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  idCard: string;
  address: string;
}

export interface ApplicationQuery {
  page?: number;
  pageSize?: number;
  status?: ApplicationStatus;
}

export interface ApplicationResponse {
  data: Application[];
  total: number;
  page: number;
  pageSize: number;
}

export const applicationService = {
  // 获取申请列表
  async getApplications(params?: ApplicationQuery): Promise<ApplicationResponse> {
    return request.get('/applications', { params });
  },

  // 同意申请
  async approveApplication(id: number): Promise<Application> {
    return request.post(`/applications/${id}/approve`);
  },

  // 拒绝申请
  async rejectApplication(id: number): Promise<Application> {
    return request.post(`/applications/${id}/reject`);
  },
};