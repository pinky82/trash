import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface CommunityCardProps {
  name: string
  address: string
  waitTime: string
  image: string
  onAppointment: () => void
}

export const CommunityCard = ({ name, address, waitTime, image, onAppointment }: CommunityCardProps) => {
  return (
    <View className='bg-gray-900 rounded-xl p-4'>
      <View className='flex'>
        <Image src={image} mode='aspectFill' className='community-card__image' />
        <View className='community-card__content'>
          <View className='community-card__name'>{name}</View>
          <View className='community-card__address'>{address}</View>
          <View className='community-card__footer'>
            <Text className='community-card__wait-time'>预计等待：{waitTime}</Text>
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