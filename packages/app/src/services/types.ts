import { CommunityWithUI } from "@/types/appointment";
import { SetStateAction } from "react";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ApiResponse<T = any> {
  map(arg0: (item: any) => any): unknown;
  code: number;
  data: T;
  message: string;
}

export interface Community {
  data: SetStateAction<CommunityWithUI | null>;
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