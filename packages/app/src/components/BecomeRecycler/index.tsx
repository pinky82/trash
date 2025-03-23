import { View, Text } from '@tarojs/components'
import './index.scss'

interface BecomeRecyclerProps {
  onApply: () => void
}

export const BecomeRecycler = ({ onApply }: BecomeRecyclerProps) => {
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
          <View
            className='become-recycler__button'
            onClick={onApply}
          >
            立即申请
          </View>
        </View>
      </View>
    </View>
  )
} 