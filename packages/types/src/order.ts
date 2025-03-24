export enum OrderFrequency {
  NO_SERVICE = 0,
  SPECIFIED_DATE = 1,
  REGULAR = 2,
}

export enum OrderMethod {
  NO_SERVICE = 0,
  DOORBELL = 1,
  SILENT = 2,
}

export enum OrderStatus {
  CANCELLED = 0,
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export interface Order {
  id: number;
  building: string;
  room: string;
  communityId: number;
  frequency: OrderFrequency;
  serviceTime: string;
  method: OrderMethod;
  specifiedDate?: Date;
  cycleDays?: string;
  creatorOpenid: string;
  status: OrderStatus;
  workerOpenid?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  building: string;
  room: string;
  communityId: number;
  frequency: OrderFrequency;
  serviceTime: string;
  method: OrderMethod;
  specifiedDate?: Date;
  cycleDays?: string;
  creatorOpenid: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  workerOpenid?: string;
} 