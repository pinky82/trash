import { View, Image } from '@tarojs/components'
import { FC } from 'react'
import './index.scss'

interface ProfileHeaderProps {
  avatar?: string
  username?: string
  memberLevel?: string
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  avatar = 'https://placekitten.com/200/200',
  username = '用户名',
  memberLevel = '普通会员'
}) => {
  return (
    <View className='profile-header'>
      <View className='profile-header__gradient'>
        <View className='profile-header__overlay'></View>
        <View className='profile-header__content'>
          <View className='profile-header__avatar-wrapper'>
            <Image
              className='profile-header__avatar'
              src={avatar}
              mode='aspectFill'
            />
          </View>
          <View className='profile-header__info'>
            <View className='profile-header__name'>{username}</View>
            <View className='profile-header__badge'>
              <View className='profile-header__badge-text'>{memberLevel}</View>
              <View className='profile-header__arrow'></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProfileHeader 