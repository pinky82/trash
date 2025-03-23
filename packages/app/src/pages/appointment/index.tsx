import { View, Image, Input, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useRouter } from '@tarojs/taro'
import { FrequencySelector } from '../../components/FrequencySelector'
import './index.scss'
import SafeView from '@/components/SafeView'
import { communityService } from '@/services/community'


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


const Appointment = () => {
  const router = useRouter()
  const [showFrequencyPopup, setShowFrequencyPopup] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<'doorbell' | 'silent'>('doorbell')
  const [form, setForm] = useState<AppointmentForm>({
    building: '',
    room: '',
    frequency: '',
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
  console.log(router)
  useEffect(() => {
    if (router.params.id) {
      fetchCommunityDetail(router.params.id)
    }
  }, [router.params.id])

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00'
  ]

  const toggleFrequencyPopup = (e: any) => {
    e.stopPropagation()
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


  const fetchCommunityDetail = async (id: string) => {
    const data = await communityService.getCommunityDetail(id)

    setCommunityInfo({
      id,
      address: data.address,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', // 模拟数据
      name: data.name || ''
    })
  }

  return (
    <View className='h-[100vh] bg-black pb-4 pt-2 box-border flex flex-col overflow-y-auto'>
      {/* 小区信息 */}
      <View className='p-4 pt-0'>
        <View className='bg-gray-900 rounded-xl p-2'>
          <View className='flex'>
            <Image
              src={communityInfo && communityInfo.image || ''}
              className='rounded-lg object-cover image'
              mode='aspectFill'
            />
            <View className='ml-4 flex-1'>
              <View className='text-base font-medium text-white'>{communityInfo && communityInfo.name}</View>
              <View className='text-gray-400 text-xs mt-1'>{communityInfo && communityInfo.address}</View>
            </View>
          </View>
        </View>
      </View>

      {/* 表单 */}
      <View className='px-4 flex-1 flex flex-col'>
        <View className='flex-1 space-y-3 '>
          {/* 楼栋号 */}
          <View>
            <View className='text-white text-xs mb-2'>楼栋号</View>
            <View className='relative'>
              <Input
                type='text'
                placeholder='请输入楼栋号'
                placeholderClass='text-gray-400'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.building}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setForm(prev => ({ ...prev, building: e.detail.value }))}
              />
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-a-01' />
              </View>
            </View>
          </View>

          {/* 门牌号 */}
          <View>
            <View className='text-white text-xs mb-2'>门牌号</View>
            <View className='relative'>
              <Input
                type='text'
                placeholder='请输入门牌号'
                placeholderClass='text-gray-400'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.room}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setForm(prev => ({ ...prev, room: e.detail.value }))}
              />
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-xinpan' />
              </View>
            </View>
          </View>

          {/* 上门频率 */}
          <View>
            <View className='text-white text-xs mb-2'>上门频率</View>

            <View className='relative z-10' onClick={e => toggleFrequencyPopup(e)}>
              <Input
                type='text'
                placeholder='请选择上门频率'
                placeholderClass='text-gray-400'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.frequency}
                style={{ height: '44px', lineHeight: '44px' }}
                disabled
              />
              <View className='absolute w-full h-full top-0 z-10'></View>
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-yuding' />
              </View>

            </View>
          </View>

          {/* 上门时间 */}
          <View>
            <View className='text-white text-xs mb-2'>上门时间</View>
            <View className='grid grid-cols-4 gap-2'>
              {timeSlots.map(time => (
                <Button
                  key={time}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors m-0 ${selectedTime === time
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
            <View className='text-white text-xs mb-2'>上门方式</View>
            <View className='grid grid-cols-2 gap-4'>
              <Button
                className={`method-selector__option bg-gray-900 w-full ${selectedMethod === 'doorbell' ? 'selected' : ''}`}
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
                className={`method-selector__option bg-gray-900 w-full ${selectedMethod === 'silent' ? 'selected' : ''}`}
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
        </View>
        {/* 提交按钮 */}
        <Button
          className='w-full bg-brand text-white rounded-full font-medium hover:bg-opacity-90 transition-colors mt-6'
          onClick={handleSubmit}
        >
          确认预约
        </Button>
        <SafeView />
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