import { View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import ProfileHeader from '../../components/ProfileHeader'
import StatsCard from '../../components/StatsCard'
import MenuList from '../../components/MenuList'
import ApiService from '../../services/api'
import { UserInfo } from '../../types/api'
import { wechat } from '../../utils/wechat'
import './index.scss'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const initUserInfo = async () => {
      try {
        // 检查登录状态
        if (!wechat.isLoggedIn()) {
          // 未登录，进行登录
          const loginResult = await wechat.login();
          console.log('loginResult', loginResult);
          // 获取用户信息
          // const userInfoRes = await ApiService.getUserInfo(loginResult.openid);
          // console.log('userInfoRes', userInfoRes);
          // if (userInfoRes) {
            // setUserInfo(userInfoRes.data);
          // }
        } else {
          // 已登录，直接获取用户信息
          // const userInfoRes = await ApiService.getUserProfile();
          // if (userInfoRes.code === 0) {
          //   setUserInfo(userInfoRes.data);
          // }
        }
      } catch (error) {
        console.error('初始化用户信息失败:', error);
        Taro.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
      }
    };

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