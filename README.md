# 社区垃圾分类管理系统

这是一个基于 NestJS + React 的社区垃圾分类管理系统，采用 monorepo 架构，使用 pnpm 作为包管理工具。

## 项目架构

项目采用 monorepo 架构，包含以下主要包：

```
packages/
├── admin/          # 管理后台前端应用
├── app/            # 用户端前端应用
├── service/        # 后端服务
└── types/          # 共享类型定义
```

### 技术栈

- **前端**：
  - React 18
  - TypeScript
  - Material-UI (MUI)
  - React Query
  - React Router
  - Tencent Maps API

- **后端**：
  - NestJS
  - TypeORM
  - PostgreSQL
  - JWT 认证
  - Swagger API 文档

- **开发工具**：
  - pnpm
  - TypeScript
  - ESLint
  - Prettier

## 功能模块

### 1. 用户认证模块 (`auth`)
- 微信小程序登录
- JWT token 认证
- 用户信息管理

### 2. 社区管理模块 (`community`)
- 社区信息管理
- 社区列表展示
- 社区搜索功能
- 地图选点功能

### 3. 申请管理模块 (`application`)
- 社区加入申请
- 申请状态管理
- 申请审核流程
- 申请记录查询

### 4. 订单管理模块 (`order`)
- 订单创建
- 订单状态管理
- 订单查询
- 订单统计

## 目录结构说明

### 后端服务 (`packages/service`)

```
src/
├── modules/           # 业务模块
│   ├── auth/         # 认证模块
│   ├── community/    # 社区模块
│   ├── application/  # 申请模块
│   └── order/        # 订单模块
├── common/           # 公共功能
│   ├── decorators/   # 装饰器
│   ├── filters/      # 异常过滤器
│   ├── guards/       # 守卫
│   ├── interceptors/ # 拦截器
│   └── pipes/        # 管道
└── config/           # 配置文件
```

### 管理后台 (`packages/admin`)

```
src/
├── app/              # 页面组件
│   └── dashboard/    # 仪表盘
├── components/       # 公共组件
├── hooks/           # 自定义 Hooks
├── service/         # API 服务
└── utils/           # 工具函数
```

### 用户端 (`packages/app`)

```
src/
├── pages/           # 页面组件
├── components/      # 公共组件
├── hooks/          # 自定义 Hooks
├── service/        # API 服务
└── utils/          # 工具函数
```

## 开发指南

### 环境要求

- Node.js >= 16
- pnpm >= 8
- PostgreSQL >= 14

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动后端服务
pnpm --filter @trash/service dev

# 启动管理后台
pnpm --filter @trash/admin dev

# 启动用户端
pnpm --filter @trash/app dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @trash/service build
pnpm --filter @trash/admin build
pnpm --filter @trash/app build
```

## 部署

### 后端服务

```bash
# 生产环境构建
pnpm --filter @trash/service build

# 启动服务
pnpm --filter @trash/service start:prod
```

### 前端应用

```bash
# 构建前端应用
pnpm --filter @trash/admin build
pnpm --filter @trash/app build
```

## 环境变量配置

### 后端服务

```env
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/trash
JWT_SECRET=your-jwt-secret
WECHAT_APP_ID=your-app-id
WECHAT_APP_SECRET=your-app-secret
```

### 前端应用

```env
# .env
VITE_API_URL=http://localhost:3000
VITE_TENCENT_MAP_KEY=your-map-key
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License 