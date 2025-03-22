# 垃圾回收系统原型

这是一个基于Web的垃圾回收系统原型，使用TailwindCSS构建的移动端优先的界面。

## 项目结构

```
prototype/
├── index.html      # 主页面，包含iframe容器
├── home.html       # 首页内容，包含广告轮播和小区列表
├── profile.html    # 个人中心页面
├── images/         # 图片资源目录
│   ├── banner1.jpg
│   ├── banner2.jpg
│   ├── community1.jpg
│   ├── community2.jpg
│   └── avatar.jpg
├── css/           # CSS样式目录（使用TailwindCSS，此目录当前为空）
└── js/            # JavaScript文件目录（当前为空）
```

## 技术栈

- HTML5
- TailwindCSS (通过CDN加载)
- Swiper.js (用于轮播图)

## 功能特性

- 响应式设计，适配iPhone Pro Max 15等移动设备
- 轮播广告展示
- 小区列表展示
- 搜索功能
- 个人中心界面

## 运行说明

1. 确保您的设备已连接到互联网（需要加载TailwindCSS和Swiper.js的CDN资源）
2. 直接在浏览器中打开 `index.html` 文件
3. 使用浏览器的移动设备模拟器（如Chrome DevTools）以获得最佳体验

## 注意事项

- 这是一个原型系统，主要用于展示UI/UX设计
- 所有的交互按钮目前都是静态的，没有实际功能
- 图片资源需要自行添加到images目录中 