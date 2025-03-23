import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { useMemo } from 'react'

interface CommunityCardProps {
  name: string
  address: string
  distance: string
  image: string
  onAppointment: () => void
}

export const CommunityCard = ({ name, address, distance, image, onAppointment }: CommunityCardProps) => {
  
  const distanceFormatted = useMemo(() => parseFloat(distance).toFixed(1), [distance])

  return (
    <View className='bg-gray-900 rounded-xl p-2'>
      <View className='flex'>
        <Image src={image} mode='aspectFill' className='community-card__image' />
        <View className='community-card__content'>
          <View className='community-card__name'>{name}</View>
          <View className='community-card__address'>{address}</View>
          <View className='community-card__footer'>
            <Text className='community-card__wait-time'>预计：{distanceFormatted}公里</Text>
            <View
              className='community-card__button'
              onClick={onAppointment}
            >
              预约上门
            </View>
          </View>
        </View>
      </View>
    </View>
  )
} 