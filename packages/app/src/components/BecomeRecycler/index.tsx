import { View, Text } from '@tarojs/components'
import './index.scss'
import { userService } from '@/services'
import { useState } from 'react'
import { ApplicationStatus } from '@trash/types'
import { useDidShow } from '@tarojs/taro'


interface BecomeRecyclerProps {
  onApply: () => void
}

export const BecomeRecycler = ({ onApply }: BecomeRecyclerProps) => {

  const [collectorStatus, setCollectorStatus] = useState(ApplicationStatus.NONE)

  useDidShow(() => {
    fetchIsCollector()
  })

  const fetchIsCollector = async () => {
    const { collectorStatus } = await userService.isCollectorStatus()
    setCollectorStatus(collectorStatus)
  }

  const renderButton = () => {
    if (collectorStatus === ApplicationStatus.NONE || collectorStatus === ApplicationStatus.REJECTED) {
      return <View className='become-recycler__button' onClick={onApply}>立即申请</View>
    }
    if (collectorStatus === ApplicationStatus.PENDING) {
      return <View className='become-recycler__button'>您已提交申请，请等待审核</View>
    }
    if (collectorStatus === ApplicationStatus.APPROVED) {
      return <View className='become-recycler__button'>前往接单</View>
    }
  }

  return (
    <View className='become-recycler'>
      <View className='become-recycler__card'>
        <View className='become-recycler__content'>
          <View className='become-recycler__info'>
            <View className='become-recycler__title'>成为丢手</View>
            <Text className='become-recycler__description'>
              加入我们的环保事业，成为专业的回收人员，为地球环保贡献一份力量
            </Text>
            <View className='become-recycler__stats'>
              <View className='become-recycler__stat-item'>
                <Text className='become-recycler__stat-number'>50+</Text>
                <Text className='become-recycler__stat-label'>活跃社区</Text>
              </View>
              <View className='become-recycler__stat-item'>
                <Text className='become-recycler__stat-number'>1000+</Text>
                <Text className='become-recycler__stat-label'>月均订单</Text>
              </View>
              <View className='become-recycler__stat-item'>
                <Text className='become-recycler__stat-number'>98%</Text>
                <Text className='become-recycler__stat-label'>好评率</Text>
              </View>
            </View>
          </View>
          {renderButton()}
        </View>
      </View>
    </View>
  )
} 