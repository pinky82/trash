import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import ProfileHeader from '../../components/ProfileHeader'
import StatsCard from '../../components/StatsCard'
import MenuList from '../../components/MenuList'
import './index.scss'

export default function Profile() {
  useLoad(() => {
    console.log('Profile page loaded.')
  })

  return (
    <View className='profile'>
      <ProfileHeader 
        avatar='https://placekitten.com/200/200'
        username='张三'
        memberLevel='黄金会员'
      />
      <StatsCard 
        stats={[
          { value: '1280', label: '积分' },
          { value: '3', label: '优惠券' },
          { value: '12', label: '收藏' },
          { value: '8', label: '历史' }
        ]}
      />
      <MenuList />
    </View>
  )
} 