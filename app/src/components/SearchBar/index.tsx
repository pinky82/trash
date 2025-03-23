import { View, Input } from '@tarojs/components'
import './index.scss'

export const SearchBar = () => {
  return (
    <View className='search-bar sticky top-0 z-10 pb-2 bg-black'>
      <View className='search-bar__container'>
        <Input
          type='text'
          placeholder='搜索小区'
          className='search-bar__input'
          style={{ height: '44px', lineHeight: '44px' }}
        />
        <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
          <View className='iconfont icon-sousuo'></View>
        </View>

      </View>
    </View>
  )
} 