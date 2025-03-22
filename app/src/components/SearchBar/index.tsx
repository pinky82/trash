import { View, Input } from '@tarojs/components'
import './index.scss'

export const SearchBar = () => {
  return (
    <View className='px-4 bg-black box-border pt-[60px]'>
      <View className='search-bar__container'>
        <Input
          type='text'
          placeholder='搜索小区'
          className='search-bar__input'
          style={{ height: '44px', lineHeight: '44px' }}
        />
        <View className='search-bar__icon'></View>
      </View>
    </View>
  )
} 