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
    icon: 'icon-quanbudingdan',
    title: '我的订单',
    subtitle: '查看全部订单记录',
    color: '#FF9500'
  },
  {
    icon: 'icon-youhuiquan',
    title: '我的优惠券',
    subtitle: '查看可用优惠券',
    color: '#A855F7'
  },
  {
    icon: 'icon-shezhi',
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
                className={`menu-list__icon iconfont ${item.icon}`}
                style={{ color: item.color }}
              />
            </View>
            <View className='menu-list__text'>
              <View className='menu-list__title'>{item.title}</View>
              <View className='menu-list__subtitle'>{item.subtitle}</View>
            </View>
          </View>
          {/* <View className='menu-list__arrow'></View> */}
        </View>
      ))}
    </View>
  )
}

export default MenuList 