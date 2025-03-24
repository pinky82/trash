import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.scss'
import './styles/iconfont.scss'
import { wechat } from './utils/wechat'

function App(props) {
  // 可以使用所有的 React Hooks

  const initWechat = async () => {
    if (!wechat.isLoggedIn()) {
      await wechat.login();
    }
  }
  
  useEffect(() => {
    initWechat();
  }, [])

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
