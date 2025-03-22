import { View, Image, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { SearchBar } from '../../components/SearchBar'
import { CommunityCard } from '../../components/CommunityCard'
import { BecomeRecycler } from '../../components/BecomeRecycler'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'

interface Community {
  id: string
  name: string
  address: string
  waitTime: string
  image: string
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: '阳光小区',
    address: '浦东新区张杨路500号',
    waitTime: '5分钟',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
  },
  {
    id: '2',
    name: '和谐花园',
    address: '浦东新区浦建路250号',
    waitTime: '3分钟',
    image: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8'
  },
  {
    id: '3',
    name: '翠湖花园',
    address: '浦东新区陆家嘴环路1000号',
    waitTime: '8分钟',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18'
  },
  {
    id: '4',
    name: '金茂府',
    address: '浦东新区世纪大道2000号',
    waitTime: '10分钟',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
  }
]

export default function Index() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  useLoad(() => {
    loadInitialData()
  })

  const loadInitialData = () => {
    setLoading(true)
    // 模拟API请求
    setTimeout(() => {
      setCommunities(mockCommunities.slice(0, itemsPerPage))
      setLoading(false)
    }, 1000)
  }

  const loadMoreData = () => {
    if (loading) return
    
    setLoading(true)
    const start = page * itemsPerPage
    const end = start + itemsPerPage
    const newCommunities = mockCommunities.slice(start, end)
    
    if (newCommunities.length === 0) {
      setLoading(false)
      return
    }
    
    setTimeout(() => {
      setCommunities(prev => [...prev, ...newCommunities])
      setPage(prev => prev + 1)
      setLoading(false)
    }, 1000)
  }

  const handleAppointment = (communityId: string) => {
    Taro.navigateTo({
      url: `/pages/appointment/index?id=${communityId}`
    })
  }

  const handleApply = () => {
    Taro.navigateTo({
      url: '/pages/application/index'
    })
  }

  return (
    <View className='min-h-screen bg-black'>
      <Header />
      <SearchBar />
      
      <View className='p-4 space-y-4'>
        {communities.map((community, index) => (
          <CommunityCard
            key={index}
            {...community}
            onAppointment={() => handleAppointment(community.id)}
          />
        ))}
        
        {loading && (
          <View className='flex justify-center py-4'>
            <View className='w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin'></View>
          </View>
        )}
      </View>

      <BecomeRecycler onApply={handleApply} />
    </View>
  )
}
