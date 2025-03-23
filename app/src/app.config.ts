export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/profile/index',
    'pages/appointment/index',
    'pages/application/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000000',
    navigationBarTitleText: '丢手',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#FF9500',
    backgroundColor: '#000000',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './assets/images/home.png',
        selectedIconPath: './assets/images/home-active.png',
        text: '首页'
      },
      {
        pagePath: 'pages/profile/index',
        iconPath: './assets/images/profile.png',
        selectedIconPath: './assets/images/profile-active.png',
        text: '我的'
      }
    ]
  }
})
