import { View, Input } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface SearchBarProps {
  onSearch: (value: string) => void;
  value: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  const [inputValue, setInputValue] = useState(value)

  const onConfirm = (e: any) => {
    // const newValue = e.detail.values

    onSearch(inputValue)
  }

  return (
    <View className='search-bar sticky top-0 z-10 pb-2 bg-black'>
      <View className='search-bar__container'>
        <Input
          type='text'
          placeholder='搜索小区'
          className='search-bar__input'
          style={{ height: '44px', lineHeight: '44px' }}
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          onConfirm={onConfirm}
        />
        <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
          <View className='iconfont icon-sousuo'></View>
        </View>
      </View>
    </View>
  )
} 