import { View } from '@tarojs/components'
import { FC } from 'react'
import './index.scss'

interface MenuItem {
  icon: string
  title: string
  subtitle: string
  color: string
}

interface MenuListProps {
  items?: MenuItem[]
}

const defaultMenuItems: MenuItem[] = [
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: '我的订单',
    subtitle: '查看全部订单记录',
    color: '#FF9500'
  },
  {
    icon: 'M12 8v13m0-13V6a4 4 0 00-4-4H5.52a2.5 2.5 0 01-2.5-2.5v0a2.5 2.5 0 012.5-2.5H12',
    title: '我的优惠券',
    subtitle: '查看可用优惠券',
    color: '#A855F7'
  },
  {
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    title: '设置',
    subtitle: '账号与安全设置',
    color: '#3B82F6'
  }
]

const MenuList: FC<MenuListProps> = ({ items = defaultMenuItems }) => {
  return (
    <View className='menu-list'>
      {items.map((item, index) => (
        <View key={index} className='menu-list__item'>
          <View className='menu-list__left'>
            <View 
              className='menu-list__icon-wrapper'
              style={{ backgroundColor: `${item.color}1A` }}
            >
              <View 
                className='menu-list__icon'
                style={{ borderColor: item.color }}
              />
            </View>
            <View className='menu-list__text'>
              <View className='menu-list__title'>{item.title}</View>
              <View className='menu-list__subtitle'>{item.subtitle}</View>
            </View>
          </View>
          <View className='menu-list__arrow'></View>
        </View>
      ))}
    </View>
  )
}

export default MenuList 