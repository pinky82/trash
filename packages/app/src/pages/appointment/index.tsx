import { View, Image, Input, Button } from '@tarojs/components'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from '@tarojs/taro'
import { FrequencySelector } from '../../components/FrequencySelector'
import './index.scss'
import SafeView from '@/components/SafeView'
import { communityService } from '@/services/community'
import {
  AppointmentForm,
  AppointmentTimeSlot,
  CommunityWithUI,
  AppointmentMethodOption
} from '@/types/appointment'
import { OrderFrequency, OrderMethod } from '@trash/types'
import { FrequencyValue } from '@/types/frequency'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Taro from '@tarojs/taro'
import { orderService } from '@/services'

const TIME_SLOTS: AppointmentTimeSlot[] = [
  { serviceTime: '09:00', isAvailable: true },
  { serviceTime: '10:00', isAvailable: true },
  { serviceTime: '11:00', isAvailable: true },
  { serviceTime: '12:00', isAvailable: true },
  { serviceTime: '13:00', isAvailable: true },
  { serviceTime: '14:00', isAvailable: true },
  { serviceTime: '15:00', isAvailable: true },
  { serviceTime: '16:00', isAvailable: true }
]

const METHOD_OPTIONS: AppointmentMethodOption[] = [
  {
    value: OrderMethod.DOORBELL,
    title: '按门铃',
    description: '到达后按门铃通知您',
    icon: 'i-carbon-notification'
  },
  {
    value: OrderMethod.SILENT,
    title: '静音模式',
    description: '到达后直接开始服务',
    icon: 'i-carbon-time'
  }
]

const validationSchema = Yup.object().shape({
  building: Yup.string().required('请输入楼栋号'),
  room: Yup.string().required('请输入门牌号'),
  frequency: Yup.object(),
  serviceTime: Yup.string().required('请选择上门时间'),
  method: Yup.string().required('请选择上门方式')
})

const Appointment = () => {
  const router = useRouter()
  const [showFrequencyPopup, setShowFrequencyPopup] = useState(false)

  const formik = useFormik({
    initialValues: {
      building: '',
      room: '',
      frequency: {
        specifiedDate: new Date(),
        cycleDays: '',
        frequency: OrderFrequency.NO_SERVICE
      },
      serviceTime: '',
      method: OrderMethod.DOORBELL
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const [communityInfo, setCommunityInfo] = useState<CommunityWithUI | null>(null)

  useEffect(() => {
    if (router.params?.id) {
      fetchCommunityDetail(router.params.id)
      fetchOrders()
    }
  }, [router.params?.id])

  const toggleFrequencyPopup = (e: any) => {
    e.stopPropagation()
    setShowFrequencyPopup(!showFrequencyPopup)
  }

  const fetchOrders = async () => {
    const res = await orderService.getOrders()
    console.log('res', res)
  }

  const frequencyFormatter = (frequency: FrequencyValue) => {
    if (frequency.frequency === OrderFrequency.SPECIFIED_DATE) {
      return `指定日期: ${dayjs(frequency.specifiedDate).format('YYYY-MM-DD')}`
    } else if (frequency.frequency === OrderFrequency.REGULAR) {
      return `周期: ${frequency.cycleDays}`
    }
    return ''
  }

  const handleSubmit = useCallback(async () => {
    // TODO: 处理表单提交
    const errors = await formik.validateForm()

    if (Object.keys(errors).length > 0) {
      Taro.showToast({
        title: Object.values(errors)[0] as string,
        icon: 'none'
      })
      return
    }
    await orderService.createOrder({ communityId: router.params.id, ...formik.values, ...formik.values.frequency })
    Taro.switchTab({
      url: '/pages/index/index'
    })

  }, [formik, router.params.id])

  const fetchCommunityDetail = async (id: string) => {
    try {
      const data = await communityService.getCommunityDetail(id)
      setCommunityInfo({
        ...data,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00' // 模拟数据
      })
    } catch (error) {
      console.error('获取小区详情错误:', error)
    }
  }

  const setFieldValue = useCallback((key: string, value: any) => {
    formik.setFieldValue(key, value)
  }, [formik])

  return (
    <View className='h-[100vh] bg-black pb-4 pt-2 box-border flex flex-col overflow-y-auto'>
      {/* 小区信息 */}
      <View className='p-4 pt-0'>
        <View className='bg-gray-900 rounded-xl p-2'>
          <View className='flex'>
            <Image
              src={communityInfo?.image || ''}
              className='rounded-lg object-cover image'
              mode='aspectFill'
            />
            <View className='ml-4 flex-1'>
              <View className='text-base font-medium text-white'>{communityInfo?.name}</View>
              <View className='text-gray-400 text-xs mt-1'>{communityInfo?.address}</View>
              {communityInfo?.distance && (
                <View className='text-gray-400 text-xs mt-1'>距离：{communityInfo.distance}km</View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* 表单 */}
      <View className='px-4 flex-1 flex flex-col'>
        <View className='flex-1 space-y-3'>
          {/* 楼栋号 */}
          <View>
            <View className='text-white text-xs mb-2'>楼栋号</View>
            <View className='relative'>
              <Input
                type='text'
                placeholder='请输入楼栋号'
                placeholderClass='text-gray-400'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={formik.values.building}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setFieldValue('building', e.detail.value)}
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
                value={formik.values.room}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setFieldValue('room', e.detail.value)}
              />
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-xinpan' />
              </View>
            </View>
          </View>

          {/* 上门频率 */}
          <View>
            <View className='text-white text-xs mb-2'>上门频率</View>
            <View className='relative z-10' onClick={toggleFrequencyPopup}>
              <Input
                type='text'
                placeholder='请选择上门频率'
                placeholderClass='text-gray-400'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={frequencyFormatter(formik.values.frequency)}
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
              {TIME_SLOTS.map(slot => (
                <Button
                  key={slot.serviceTime}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors m-0 ${formik.values.serviceTime === slot.serviceTime
                    ? 'bg-brand text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  onClick={() => formik.setFieldValue('serviceTime', slot.serviceTime)}
                  disabled={!slot.isAvailable}
                >
                  {slot.serviceTime}
                </Button>
              ))}
            </View>
          </View>

          {/* 上门方式 */}
          <View>
            <View className='text-white text-xs mb-2'>上门方式</View>
            <View className='grid grid-cols-2 gap-4'>
              {METHOD_OPTIONS.map(option => (
                <Button
                  key={option.value}
                  className={`method-selector__option bg-gray-900 w-full ${formik.values.method === option.value ? 'selected' : ''
                    }`}
                  onClick={() => formik.setFieldValue('method', option.value)}
                >
                  <View className='method-selector__option-icon'>
                    <View className={option.icon} />
                  </View>
                  <View className='method-selector__option-content'>
                    <View className='method-selector__option-title'>{option.title}</View>
                    <View className='method-selector__option-desc'>{option.description}</View>
                  </View>
                </Button>
              ))}
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
        value={formik.values.frequency}
        onChange={(value) => formik.setFieldValue('frequency', value)}
        onClose={() => setShowFrequencyPopup(false)}
        visible={showFrequencyPopup}
      />
    </View>
  )
}

export default Appointment