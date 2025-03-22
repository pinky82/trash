import { View, Image, Input, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useRouter } from '@tarojs/taro'
import { FrequencySelector } from '../../components/FrequencySelector'
import './index.scss'

interface CommunityInfo {
  id: string
  name: string
  address: string
  image: string
}

interface AppointmentForm {
  building: string
  room: string
  frequency: string
  time: string
  method: 'doorbell' | 'silent'
}

const mockCommunities: Record<string, CommunityInfo> = {
  '1': {
    id: '1',
    name: '阳光小区',
    address: '浦东新区张杨路500号',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
  },
  '2': {
    id: '2',
    name: '和平花园',
    address: '浦东新区陆家嘴环路1000号',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
  }
}

const Appointment = () => {
  const router = useRouter()
  const [showFrequencyPopup, setShowFrequencyPopup] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<'doorbell' | 'silent'>('doorbell')
  const [form, setForm] = useState<AppointmentForm>({
    building: '',
    room: '',
    frequency: '请选择上门频率',
    time: '',
    method: 'doorbell'
  })
  const [frequency, setFrequency] = useState('')
  const [time, setTime] = useState('')
  const [method, setMethod] = useState('')
  const [showFrequency, setShowFrequency] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [showMethod, setShowMethod] = useState(false)
  const [communityInfo, setCommunityInfo] = useState<CommunityInfo | null>(null)

  // 获取路由参数
  useEffect(() => {
    if (router.params?.id) {
      const community = mockCommunities[router.params.id]
      if (community) {
        setCommunityInfo(community)
      }
    }
  }, [router.params])

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00'
  ]

  const toggleFrequencyPopup = () => {
    setShowFrequencyPopup(!showFrequencyPopup)
  }

  const handleFrequencyChange = (frequency: string) => {
    setForm(prev => ({ ...prev, frequency }))
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setForm(prev => ({ ...prev, time }))
  }

  const handleMethodSelect = (method: 'doorbell' | 'silent') => {
    setSelectedMethod(method)
    setForm(prev => ({ ...prev, method }))
  }

  const handleSubmit = () => {
    // TODO: 处理表单提交
    console.log('Form submitted:', form)
  }

  return (
    <View className='min-h-screen bg-black py-4'>
      {/* 小区信息 */}
      <View className='p-4 pt-0'>
        <View className='bg-gray-900 rounded-xl p-4'>
          <View className='flex'>
            <Image
              src={communityInfo?.image || ''}
              className='rounded-lg object-cover image'
              mode='aspectFill'
            />
            <View className='ml-4 flex-1'>
              <View className='text-base font-medium text-white'>{communityInfo?.name}</View>
              <View className='text-gray-400 text-xs mt-1'>{communityInfo?.address}</View>
            </View>
          </View>
        </View>
      </View>

      {/* 表单 */}
      <View className='px-4 space-y-4'>
        {/* 楼栋号 */}
        <View>
          <View className='text-white text-sm mb-2'>楼栋号</View>
          <View className='relative'>
            <Input
              type='text'
              placeholder='请输入楼栋号'
              className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
              value={form.building}
              onInput={e => setForm(prev => ({ ...prev, building: e.detail.value }))}
            />
            <View className='absolute left-3 top-3.5 text-gray-400'>
              <View className='i-carbon-building' />
            </View>
          </View>
        </View>

        {/* 门牌号 */}
        <View>
          <View className='text-white text-sm mb-2'>门牌号</View>
          <View className='relative'>
            <Input
              type='text'
              placeholder='请输入门牌号'
              className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
              value={form.room}
              onInput={e => setForm(prev => ({ ...prev, room: e.detail.value }))}
            />
            <View className='absolute left-3 top-3.5 text-gray-400'>
              <View className='i-carbon-home' />
            </View>
          </View>
        </View>

        {/* 上门频率 */}
        <View>
          <View className='text-white text-sm mb-2'>上门频率</View>
          <Button
            className='w-full p-3 text-xs rounded-lg bg-gray-900 text-white text-left flex justify-between items-center m-0'
            onClick={toggleFrequencyPopup}
          >
            <View className={`${form.frequency === '请选择上门频率' ? 'text-gray-400' : 'text-white'}`}>
              {form.frequency}
            </View>
            <View className='i-carbon-chevron-down text-gray-400' />
          </Button>
        </View>

        {/* 上门时间 */}
        <View>
          <View className='text-white text-sm mb-2'>上门时间</View>
          <View className='grid grid-cols-4 gap-2'>
            {timeSlots.map(time => (
              <Button
                key={time}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors m-0 ${
                  selectedTime === time
                    ? 'bg-brand text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </View>
        </View>

        {/* 上门方式 */}
        <View>
          <View className='text-white text-sm mb-2'>上门方式</View>
          <View className='grid grid-cols-2 gap-4'>
            <Button
              className={`method-selector__option ${selectedMethod === 'doorbell' ? 'selected' : ''}`}
              onClick={() => handleMethodSelect('doorbell')}
            >
              <View className='method-selector__option-icon'>
                <View className='i-carbon-notification' />
              </View>
              <View className='method-selector__option-content'>
                <View className='method-selector__option-title'>按门铃</View>
                <View className='method-selector__option-desc'>到达后按门铃通知您</View>
              </View>
            </Button>
            <Button
              className={`method-selector__option ${selectedMethod === 'silent' ? 'selected' : ''}`}
              onClick={() => handleMethodSelect('silent')}
            >
              <View className='method-selector__option-icon'>
                <View className='i-carbon-time' />
              </View>
              <View className='method-selector__option-content'>
                <View className='method-selector__option-title'>静音模式</View>
                <View className='method-selector__option-desc'>到达后直接开始服务</View>
              </View>
            </Button>
          </View>
        </View>

        {/* 提交按钮 */}
        <Button
          className='w-full bg-brand text-white rounded-full font-medium hover:bg-opacity-90 transition-colors mt-6'
          onClick={handleSubmit}
        >
          确认预约
        </Button>
      </View>

      {/* 频率选择弹窗 */}
      <View
        className={`frequency-popup-overlay ${showFrequencyPopup ? 'active' : ''}`}
        onClick={toggleFrequencyPopup}
      />
      <FrequencySelector
        value={frequency}
        onChange={setFrequency}
        onClose={() => setShowFrequency(false)}
        visible={showFrequencyPopup}
      />
    </View>
  )
}

export default Appointment