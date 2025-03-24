import { OrderFrequency } from '@trash/types'

export interface FrequencyValue {
    specifiedDate: Date | null
    cycleDays: string
    frequency: OrderFrequency
} 