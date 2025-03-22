import { View, Image, Button, Input } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
// import '../../styles/iconfont.scss'
import './index.scss'

interface ApplicationForm {
  name: string
  phone: string
  idCard: string
  address: string
}

const Application = () => {
  const [form, setForm] = useState<ApplicationForm>({
    name: '',
    phone: '',
    idCard: '',
    address: '',
  })

  useEffect(() => {
    // 监听返回按钮事件
    Taro.eventCenter.on('navigateBack', () => {
      Taro.navigateBack()
    })
  }, [])

  const handleSubmit = () => {
    // TODO: 处理表单提交
    console.log('Form submitted:', form)
  }

  return (
    <View className='min-h-full bg-black py-4 pt-2 box-border flex flex-col'>
      {/* 头部信息 */}
      <View className='p-4 pt-2'>
        <View className='bg-gradient-to-r from-brand to-brand-light rounded-xl p-4'>
          <View className='flex items-center justify-between'>
            <View>
              <View className='text-white text-base font-medium'>成为丢手</View>
              <View className='text-white/80 text-xs mt-1'>加入我们，开启环保事业</View>
            </View>
          </View>
        </View>
      </View>
      <View className='px-4 flex-1 flex flex-col'>
        {/* 表单 */}
        <View className='flex-1 flex flex-col space-y-3'>
          {/* 姓名 */}
          <View>
            <View className='text-white text-xs mb-2'>姓名</View>
            <View className='relative'>
              <Input
                type='text'
                placeholder='请输入真实姓名'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.name}
                onInput={e => setForm(prev => ({ ...prev, name: e.detail.value }))}
              />

              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-wode' />
              </View>
            </View>
          </View>

          {/* 手机号 */}
          <View>
            <View className='text-white text-xs mb-2'>手机号</View>
            <View className='relative'>
              <Input
                type='number'
                placeholder='请输入手机号'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.phone}
                onInput={e => setForm(prev => ({ ...prev, phone: e.detail.value }))}
              />
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-qudian' />
              </View>
            </View>
          </View>

          {/* 身份证号 */}
          <View>
            <View className='text-white text-xs mb-2'>身份证号</View>
            <View className='relative'>
              <Input
                type='idcard'
                placeholder='请输入身份证号'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.idCard}
                onInput={e => setForm(prev => ({ ...prev, idCard: e.detail.value }))}
              />
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-qianyue' />
              </View>
            </View>
          </View>

          {/* 居住地址 */}
          <View>
            <View className='text-white text-xs mb-2'>居住地址</View>
            <View className='relative'>
              <Input
                type='text'
                placeholder='请输入详细居住地址'
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={form.address}
                onInput={e => setForm(prev => ({ ...prev, address: e.detail.value }))}
              />
              <View className='absolute left-3 top-1/2 text-gray-400 -translate-y-1/2'>
                <View className='iconfont icon-ditubankuai' />
              </View>
            </View>
          </View>


        </View>
        {/* 提交按钮 */}
        <Button
          className='w-full p-2 bg-brand text-white rounded-full font-medium text-xs hover:bg-opacity-90 transition-colors mt-6'
          onClick={handleSubmit}
        >
          提交申请
        </Button>
      </View>
    </View>
  )
}

export default Application 