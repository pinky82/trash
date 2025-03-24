import { request } from "@/utils/request";

export const userService = {
  login: (phone: string, password: string) => request.post('/auth/login', { phone, password }),
  register: (name: string, phone: string, password: string) => request.post('/auth/register', { name, phone, password }),
}

