import { Community } from '../services/types'
import { FrequencyValue } from './frequency'

export interface AppointmentForm {
  building: string
  room: string
  frequency: FrequencyValue
  time: string
  method: AppointmentMethod
}

export type AppointmentMethod = 'doorbell' | 'silent'

export interface AppointmentTimeSlot {
  time: string
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
  value: AppointmentMethod
  title: string
  description: string
  icon: string
} 