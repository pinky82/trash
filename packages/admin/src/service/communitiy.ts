import { request } from "@/utils/request";


export const communityService = {
  getCommunities: () => request.get('/communities'),
  createCommunity: (data: any) => request.post('/communities', data),
  deleteCommunity: (id: string) => request.delete(`/communities/${id}`),
}