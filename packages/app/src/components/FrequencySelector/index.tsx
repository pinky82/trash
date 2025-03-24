import { View, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { OrderFrequency } from '@trash/types'
import { FrequencyValue } from '../../types/frequency'
import { Calendar } from '../Calendar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Taro from '@tarojs/taro'
import './index.scss'

interface FrequencySelectorProps {
    value: FrequencyValue
    onChange: (value: FrequencyValue) => void
    onClose: () => void
    visible: boolean
}

const validationSchema = Yup.object().shape({
    frequency: Yup.number().required(),
    cycleDays: Yup.string().when('frequency', ([frequency]: OrderFrequency[]) => {
        if (frequency === OrderFrequency.REGULAR) {
            return Yup.string().required('请选择服务日期')
        }
        return Yup.string()
    }),
    specifiedDate: Yup.date().nullable().when(['frequency'], ([frequency]: OrderFrequency[]) => {
        if (frequency === OrderFrequency.SPECIFIED_DATE) {
            return Yup.date().required('请选择服务日期')
        }
        return Yup.string()
    })
})

export const FrequencySelector = ({ value, onChange, onClose, visible }: FrequencySelectorProps) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentType, setCurrentType] = useState<OrderFrequency>(value.frequency || OrderFrequency.SPECIFIED_DATE)

    const weekDays = ['日', '一', '二', '三', '四', '五', '六']

    const formik = useFormik({
        initialValues: {
            frequency: value.frequency || OrderFrequency.SPECIFIED_DATE,
            cycleDays: value.cycleDays || '',
            specifiedDate: value.specifiedDate || null
        },
        validationSchema,
        onSubmit: (values) => {
            onChange(values)
            onClose()
        }
    })

    useEffect(() => {
        // 初始化选中状态
        if (value.cycleDays) {
            setSelectedDays(value.cycleDays.split('、'))
        }
        if (value.specifiedDate) {
            setSelectedDate(new Date(value.specifiedDate))
        }
    }, [value])

    const handleFrequencySelect = (frequency: OrderFrequency) => {
        setCurrentType(frequency)
        formik.setFieldValue('frequency', frequency)
    }

    const handleDaySelect = (day: string) => {
        setSelectedDays(prev => {
            const newDays = prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
            formik.setFieldValue('cycleDays', newDays.sort((a, b) => Number(a) - Number(b)).join('、'))
            return newDays
        })
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
        formik.setFieldValue('specifiedDate', date)
    }

    const handleConfirm = async () => {
        const errors = await formik.validateForm()
        if (Object.keys(errors).length > 0) {
            Taro.showToast({
                title: Object.values(errors)[0] as string,
                icon: 'none'
            })
            return
        }
        onChange(formik.values)
        onClose()
        // formik.handleSubmit()
    }

    return (
        <View className={`frequency-selector ${visible ? 'frequency-selector--active' : ''}`}>
            <View className='frequency-selector__header'>
                <View className='frequency-selector__title'>选择上门频率</View>
            </View>

            <View className='frequency-selector__content'>
                <View className='frequency-selector__options'>
                    <Button
                        className={`frequency-selector__option bg-gray-900 w-full ${currentType === OrderFrequency.SPECIFIED_DATE ? 'selected' : ''}`}
                        onClick={() => handleFrequencySelect(OrderFrequency.SPECIFIED_DATE)}
                    >
                        <View className='frequency-selector__option-icon'>
                            <View className='i-carbon-calendar' />
                        </View>
                        <View className='frequency-selector__option-content'>
                            <View className='frequency-selector__option-title'>指定服务</View>
                            <View className='frequency-selector__option-desc'>单次上门服务</View>
                        </View>
                    </Button>
                    <Button
                        className={`frequency-selector__option bg-gray-900 w-full ${currentType === OrderFrequency.REGULAR ? 'selected' : ''}`}
                        onClick={() => handleFrequencySelect(OrderFrequency.REGULAR)}
                    >
                        <View className='frequency-selector__option-icon'>
                            <View className='i-carbon-repeat' />
                        </View>
                        <View className='frequency-selector__option-content'>
                            <View className='frequency-selector__option-title'>定期服务</View>
                            <View className='frequency-selector__option-desc'>固定时间定期服务</View>
                        </View>
                    </Button>
                </View>
                <>
                    {currentType === OrderFrequency.REGULAR && (
                        <View className='frequency-selector__regular'>
                            <View className='frequency-selector__regular-title'>选择日期</View>
                            <View className='frequency-selector__regular-days'>
                                {weekDays.map(day => (
                                    <Button
                                        key={day}
                                        className={`frequency-selector__regular-day mt-0 p-0 bg-gray-900 ${selectedDays.includes(day) ? 'selected' : ''}`}
                                        onClick={() => handleDaySelect(day)}
                                    >
                                        {day}
                                    </Button>
                                ))}
                            </View>
                        </View>
                    )}

                    {currentType === OrderFrequency.SPECIFIED_DATE && (
                        <View className='frequency-selector__regular'>
                            <Calendar
                                onDateSelect={handleDateSelect}
                                selectedDate={selectedDate}
                            />
                        </View>
                    )}

                    <Button
                        className='frequency-selector__confirm'
                        onClick={handleConfirm}
                    >
                        确认
                    </Button>
                </>
            </View>
        </View>
    )
} 