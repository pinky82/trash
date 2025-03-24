import { OrderMethod } from '@trash/types'
import { Community } from '../services/types'
import { FrequencyValue } from './frequency'

export interface AppointmentForm {
  building: string
  room: string
  frequency: FrequencyValue
  serviceTime: string
  method: OrderMethod
}

export type AppointmentMethod = 'doorbell' | 'silent'

export interface AppointmentTimeSlot {
  serviceTime: string
  isAvailable: boolean
}

export interface AppointmentFrequency {
  value: string
  label: string
  description?: string
}

export interface CommunityWithUI extends Community {
  image: string
}

export interface AppointmentMethodOption {
  value: OrderMethod
  title: string
  description: string
  icon: string
} 