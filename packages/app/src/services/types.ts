export interface Location {
  latitude: number;
  longitude: number;
}

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface Community {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Appointment {
  id: number;
  communityId: number;
  userId: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
} 