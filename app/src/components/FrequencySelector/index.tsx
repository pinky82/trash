import { View, Button } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface FrequencySelectorProps {
    value: string
    onChange: (value: string) => void
    onClose: () => void
    visible: boolean
}

export const FrequencySelector = ({ value, onChange, onClose, visible }: FrequencySelectorProps) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentType, setCurrentType] = useState<'指定服务' | '定期服务' | null>(null)

    const weekDays = ['日', '一', '二', '三', '四', '五', '六']

    const handleFrequencySelect = (frequency: '指定服务' | '定期服务') => {
        setCurrentType(frequency)
    }

    const handleDaySelect = (day: string) => {
        setSelectedDays(prev => {
            if (prev.includes(day)) {
                return prev.filter(d => d !== day)
            }
            return [...prev, day]
        })
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
    }

    const handleConfirm = () => {
        if (currentType === '定期服务' && selectedDays.length > 0) {
            onChange(`每周${selectedDays.join('、')}`)
        } else if (currentType === '指定服务' && selectedDate) {
            const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            onChange(`${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`)
        }
        onClose()
    }

    const previousMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() - 1)
            return newDate
        })
    }

    const nextMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() + 1)
            return newDate
        })
    }

    const renderCalendar = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()

        const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

        return (
            <View className='frequency-selector__calendar'>
                <View className='frequency-selector__calendar-header flex items-center justify-between'>
                    <View className='frequency-selector__regular-title mb-0'>选择日期</View>
                    <View className='flex items-center'>
                        <View className='frequency-selector__calendar-nav' onClick={previousMonth}>
                            <View className='i-carbon-chevron-left'>&lt;</View>
                        </View>
                        <View className='frequency-selector__calendar-title'>
                            {year}年{monthNames[month]}
                        </View>
                        <View className='frequency-selector__calendar-nav' onClick={nextMonth}>
                            <View className='i-carbon-chevron-right'>&gt;</View>
                        </View>
                    </View>
                </View>

                <View className='frequency-selector__calendar-weekdays'>
                    {weekDays.map(day => (
                        <View key={day} className='frequency-selector__calendar-weekday'>
                            {day}
                        </View>
                    ))}
                </View>

                <View className='frequency-selector__calendar-days'>
                    {Array.from({ length: startingDay }).map((_, index) => (
                        <View key={`empty-${index}`} className='frequency-selector__calendar-day empty' />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const date = new Date(year, month, index + 1)
                        const isToday = date.toDateString() === new Date().toDateString()
                        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

                        return (
                            <Button
                                key={index}
                                className={`frequency-selector__calendar-day bg-gray-900 p-0  mt-2 ${isSelected ? 'selected' : isToday ? 'today' : ''
                                    }`}
                                onClick={() => handleDateSelect(date)}
                            >
                                {index + 1}
                            </Button>
                        )
                    })}
                </View>
            </View>
        )
    }

    return (
        <View className={`frequency-selector ${visible ? 'frequency-selector--active' : ''}`}>
            <View className='frequency-selector__header'>
                <View className='frequency-selector__title'>选择上门频率</View>
            </View>

            <View className='frequency-selector__content'>
                <View className='frequency-selector__options'>
                    <Button
                        className={`frequency-selector__option bg-gray-900 w-full ${currentType === '指定服务' ? 'selected' : ''}`}
                        onClick={() => handleFrequencySelect('指定服务')}
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
                        className={`frequency-selector__option bg-gray-900 w-full ${currentType === '定期服务' ? 'selected' : ''}`}
                        onClick={() => handleFrequencySelect('定期服务')}
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
                    {currentType === '定期服务' && (
                        <View className='frequency-selector__regular'>
                            <View className='frequency-selector__regular-title'>选择日期</View>
                            <View className='frequency-selector__regular-days'>
                                {weekDays.map(day => (
                                    <Button
                                        key={day}
                                        className={`frequency-selector__regular-day mt-0 p-0 bg-gray-900 ${selectedDays.includes(day) ? 'selected' : ''
                                            }`}
                                        onClick={() => handleDaySelect(day)}
                                    >
                                        {day}
                                    </Button>
                                ))}
                            </View>
                        </View>
                    )}

                    {currentType === '指定服务' && <View className='frequency-selector__regular'>

                        {renderCalendar()}
                    </View>}

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