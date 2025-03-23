import { View, Image, Button, Text } from '@tarojs/components'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Header } from '../../components/Header'
import { SearchBar } from '../../components/SearchBar'
import { CommunityCard } from '../../components/CommunityCard'
import { BecomeRecycler } from '../../components/BecomeRecycler'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'
import { useSystemInfo } from '@/hooks/useSystemInfo'
import { communityService } from '../../services/community'
import { locationUtil } from '../../utils/location'
import { Community } from '../../services/types'

interface CommunityWithUI extends Community {
  image: string;
}

export default function Index() {
  const [communities, setCommunities] = useState<CommunityWithUI[]>([])
  const [headerBoundingClientRect, setHeaderBoundingClientRect] = useState<any>(null)
  const headerRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    fetchCommunities()
  }, [])

  const fetchCommunities = async (searchParams?: { name?: string }) => {
    try {
      setLoading(true)
      setError(null)
      
      // 获取当前位置
      const location = await locationUtil.getCurrentLocation()
      setCurrentLocation(location)
      
      // 获取社区列表
      const data = await communityService.getCommunities(location || undefined, searchParams)
      
      // 合并后端数据和模拟数据
      const mergedData = data.map(item => ({
        ...item,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00' // 模拟数据
      })) as CommunityWithUI[]
      
      setCommunities(mergedData)
    } catch (error) {
      setError('获取社区列表失败，请稍后重试')
      console.error('获取社区列表错误:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
    fetchCommunities({ name: value })
  }

  const handleAppointment = (communityId: number) => {
    Taro.navigateTo({
      url: `/pages/appointment/index?id=${communityId}`
    })
  }

  const handleApply = () => {
    Taro.navigateTo({
      url: '/pages/application/index'
    })
  }

  useEffect(() => {
    const query = Taro.createSelectorQuery()
    query.select('.header').boundingClientRect(res => {
      setHeaderBoundingClientRect(res)
    }).exec()
  }, [])

  const headerHeight = useMemo(() => {
    if(!headerBoundingClientRect) return 0
    return headerBoundingClientRect.height + headerBoundingClientRect.top
  }, [headerBoundingClientRect])

  return (
    <View className='h-screen bg-black flex flex-col overflow-hidden'>
      <Header ref={headerRef} />

      <View className='px-4 flex-1 overflow-y-auto relative' style={{ marginTop: headerHeight }}>
        <SearchBar onSearch={handleSearch} value={searchText} />
        <View className='space-y-2'>
          {communities.map((community, index) => (
            <CommunityCard
              key={index}
              {...community}
              distance={community.distance?.toString() || ''}
              onAppointment={() => handleAppointment(community.id)}
            />
          ))}
        </View>
      </View>

      <BecomeRecycler onApply={handleApply} />
    </View>
  )
}
