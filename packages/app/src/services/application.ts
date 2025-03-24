
import { request } from '../utils/request';

export const applicationService = {
  createApplication: async (application) => {
    const response = await request.post('/applications', application);
    return response.data;
  }
}