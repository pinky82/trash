import Taro from '@tarojs/taro';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  name: string;
}

export const locationUtil = {
  /**
   * 选择位置
   * @returns Promise<Location | null>
   */
  chooseLocation: async (): Promise<Location | null> => {
    try {
      // 先检查位置权限
      const setting = await Taro.getSetting();
      if (!setting.authSetting['scope.userLocation']) {
        // 如果没有权限，请求权限
        await Taro.authorize({
          scope: 'scope.userLocation'
        });
      }

      const res = await Taro.chooseLocation();
      return {
        latitude: res.latitude,
        longitude: res.longitude,
        address: res.address,
        name: res.name
      };
    } catch (error) {
      console.error('选择位置失败:', error);
      // 如果用户拒绝授权，显示引导提示
      if (error.errMsg?.includes('auth deny')) {
        Taro.showModal({
          title: '需要位置权限',
          content: '为了帮您选择位置，需要获取您的位置信息。是否去设置？',
          success: (res) => {
            if (res.confirm) {
              Taro.openSetting();
            }
          }
        });
      }
      return null;
    }
  },

  /**
   * 获取当前位置
   * @returns Promise<Location | null>
   */
  getCurrentLocation: async (): Promise<Location | null> => {
    try {
      // 先检查位置权限
      const setting = await Taro.getSetting();
      if (!setting.authSetting['scope.userLocation']) {
        // 如果没有权限，请求权限
        await Taro.authorize({
          scope: 'scope.userLocation'
        });
      }

      const res = await Taro.getLocation({
        type: 'gcj02',
        isHighAccuracy: true,
        highAccuracyExpireTime: 3000
      });

      return {
        latitude: res.latitude,
        longitude: res.longitude,
        address: '',
        name: ''
      };
    } catch (error) {
      console.error('获取位置失败:', error);
      // 如果用户拒绝授权，显示引导提示
      if (error.errMsg?.includes('auth deny')) {
        Taro.showModal({
          title: '需要位置权限',
          content: '为了帮您找到附近的社区，需要获取您的位置信息。是否去设置？',
          success: (res) => {
            if (res.confirm) {
              Taro.openSetting();
            }
          }
        });
      }
      return null;
    }
  }
}; 