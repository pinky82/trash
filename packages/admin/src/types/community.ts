export interface Community {
  id: number;
  name: string;
  address: string;
  image?: string;
  collectorCount?: number;
  orderCount?: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
} 