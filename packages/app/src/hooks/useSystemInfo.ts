import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'

interface SystemInfo {
  isMiniProgram: boolean
  windowWidth: number
  windowHeight: number
  statusBarHeight: number
  menuButtonInfo: {
    top: number
    right: number
    bottom: number
    width: number
    height: number
  } | null
  safeArea: {
    top: number
    right: number
    bottom: number
    left: number
    width: number
    height: number
  } | null
}

export const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    isMiniProgram: false,
    windowWidth: 0,
    windowHeight: 0,
    statusBarHeight: 0,
    menuButtonInfo: null,
    safeArea: null
  })

  useEffect(() => {
    const getSystemInfo = async () => {
      try {
        // 获取系统信息
        const systemInfo = await Taro.getSystemInfo()
        
        // 获取胶囊按钮位置信息
        const menuButtonInfo = await Taro.getMenuButtonBoundingClientRect()
        
        setSystemInfo({
          isMiniProgram: true,
          windowWidth: systemInfo.windowWidth || 0,
          windowHeight: systemInfo.windowHeight || 0,
          statusBarHeight: systemInfo.statusBarHeight || 0,
          menuButtonInfo: {
            top: menuButtonInfo.top,
            right: menuButtonInfo.right,
            bottom: menuButtonInfo.bottom,
            width: menuButtonInfo.width,
            height: menuButtonInfo.height
          },
          safeArea: systemInfo.safeArea ? {
            top: systemInfo.safeArea.top,
            right: systemInfo.safeArea.right,
            bottom: systemInfo.safeArea.bottom,
            left: systemInfo.safeArea.left,
            width: systemInfo.safeArea.width,
            height: systemInfo.safeArea.height
          } : null
        })
      } catch (error) {
        console.error('获取系统信息失败:', error)
        // 如果不是小程序环境，设置默认值
        setSystemInfo({
          isMiniProgram: false,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          statusBarHeight: 0,
          menuButtonInfo: null,
          safeArea: null
        })
      }
    }

    getSystemInfo()

    // 监听窗口大小变化
    const handleResize = () => {
      getSystemInfo()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return systemInfo
} 