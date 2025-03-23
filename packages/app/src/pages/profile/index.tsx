import { View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import ProfileHeader from '../../components/ProfileHeader'
import StatsCard from '../../components/StatsCard'
import MenuList from '../../components/MenuList'
import { UserInfo } from '../../types/api'
import { wechat } from '../../utils/wechat'
import './index.scss'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const initUserInfo = async () => {
    // 检查登录状态
    if (!wechat.isLoggedIn()) {
      // 未登录，进行登录
      await wechat.login();
    }
  };

  useEffect(() => {

    initUserInfo();
  }, []);

  return (
    <View className='profile min-h-full'>
      <ProfileHeader
        avatar={userInfo ? userInfo.headimgurl : 'https://placekitten.com/200/200'}
        username={userInfo ? userInfo.nickname : '未登录'}
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

export default Profile 