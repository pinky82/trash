import { View, Button, Input } from '@tarojs/components'
import { useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
// import '../../styles/iconfont.scss'
import './index.scss'
import SafeView from '@/components/SafeView'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { applicationService } from '@/services'

interface ApplicationForm {
  name: string
  phone: string
  idCard: string
  address: string
}

// 身份证号正则
const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
// 手机号正则
const phoneRegex = /^1[3-9]\d{9}$/

const validationSchema = Yup.object().shape({
  name: Yup.string().required('姓名不能为空'),
  phone: Yup.string().required('手机号不能为空').matches(phoneRegex, '手机号格式不正确'),
  idCard: Yup.string().required('身份证号不能为空').matches(idCardRegex, '身份证号格式不正确'),
  address: Yup.string().required('居住地址不能为空'),
})

const Application = () => {

  const formik = useFormik<ApplicationForm>({
    initialValues: {
      name: '',
      phone: '',
      idCard: '',
      address: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  useEffect(() => {
    // 监听返回按钮事件
    Taro.eventCenter.on('navigateBack', () => {
      Taro.navigateBack()
    })
  }, [])

  const setFieldValue = useCallback((key: string, value: any) => {
    formik.setFieldValue(key, value)
  }, [formik])

  const handleSubmit = useCallback(async() => {
    // TODO: 处理表单提交
    const errors = await formik.validateForm()
    if (Object.keys(errors).length > 0) {
      Taro.showToast({
        title: Object.values(errors)[0] as string,
        icon: 'none'
      })
      return
    }
    await applicationService.createApplication(formik.values)

  }, [formik])

  return (
    <View className='h-screen bg-black py-4 pt-2 box-border flex flex-col  overflow-y-auto'>
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
                value={formik.values.name}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setFieldValue('name', e.detail.value)}
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
                value={formik.values.phone}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setFieldValue('phone', e.detail.value)}
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
                value={formik.values.idCard}
                style={{ height: '44px', lineHeight: '44px' }}
                onInput={e => setFieldValue('idCard', e.detail.value)}
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
                style={{ height: '44px', lineHeight: '44px' }}
                className='w-full p-2 text-xs pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 box-border'
                value={formik.values.address}
                onInput={e => setFieldValue('address', e.detail.value)}
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
        <SafeView />
      </View>
    </View>
  )
}

export default Application 