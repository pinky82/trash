import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'

export const Header = () => {
  const [location, setLocation] = useState('上海市')

  const handleLocationClick = () => {
    Taro.chooseLocation({
      success: (res) => {
        // 这里可以处理选择的位置信息
        console.log('选择的位置：', res)
      },
      fail: (err) => {
        console.error('选择位置失败：', err)
      }
    })
  }

  return (
    <View className='header'>
      <View className='header__location' onClick={handleLocationClick}>
        <Text className='header__city'>{location}</Text>
        <View className='header__arrow'></View>
      </View>
    </View>
  )
} 