import { View } from '@tarojs/components'
import { FC } from 'react'
import './index.scss'

interface StatItem {
  value: string
  label: string
}

interface StatsCardProps {
  stats?: StatItem[]
}

const defaultStats: StatItem[] = [
  { value: '0', label: '积分' },
  { value: '0', label: '优惠券' },
  { value: '0', label: '收藏' },
  { value: '0', label: '历史' }
]

const StatsCard: FC<StatsCardProps> = ({ stats = defaultStats }) => {
  return (
    <View className='stats-card'>
      {stats.map((stat, index) => (
        <View key={index} className='stats-card__item'>
          <View className='stats-card__value'>{stat.value}</View>
          <View className='stats-card__label'>{stat.label}</View>
        </View>
      ))}
    </View>
  )
}

export default StatsCard 