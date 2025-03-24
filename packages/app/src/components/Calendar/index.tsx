import { View, Button } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface CalendarProps {
    onDateSelect: (date: Date) => void
    selectedDate: Date | null
}

export const Calendar = ({ onDateSelect, selectedDate }: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const weekDays = ['日', '一', '二', '三', '四', '五', '六']
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

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

        return (
            <View className='calendar'>
                <View className='calendar__header flex items-center justify-between'>
                    <View className='calendar__regular-title mb-0'>选择日期</View>
                    <View className='flex items-center'>
                        <View className='calendar__nav' onClick={previousMonth}>
                            <View className='i-carbon-chevron-left'>&lt;</View>
                        </View>
                        <View className='calendar__title'>
                            {year}年{monthNames[month]}
                        </View>
                        <View className='calendar__nav' onClick={nextMonth}>
                            <View className='i-carbon-chevron-right'>&gt;</View>
                        </View>
                    </View>
                </View>

                <View className='calendar__weekdays'>
                    {weekDays.map(day => (
                        <View key={day} className='calendar__weekday'>
                            {day}
                        </View>
                    ))}
                </View>

                <View className='calendar__days'>
                    {Array.from({ length: startingDay }).map((_, index) => (
                        <View key={`empty-${index}`} className='calendar__day empty' />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const date = new Date(year, month, index + 1)
                        const isToday = date.toDateString() === new Date().toDateString()
                        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

                        return (
                            <Button
                                key={index}
                                className={`calendar__day bg-gray-900 p-0 mt-2 ${isSelected ? 'selected' : isToday ? 'today' : ''}`}
                                onClick={() => onDateSelect(date)}
                            >
                                {index + 1}
                            </Button>
                        )
                    })}
                </View>
            </View>
        )
    }

    return renderCalendar()
} 