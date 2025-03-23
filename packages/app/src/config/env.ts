// 环境变量配置
const env = {
  development: {
    API_URL: 'http://localhost:3000',
    APP_TITLE: 'Trash'
  },
  production: {
    API_URL: 'https://api.yourdomain.com',
    APP_TITLE: 'Trash'
  }
};

// 获取当前环境
const currentEnv = process.env.NODE_ENV || 'development';

// 导出当前环境的配置
export default env[currentEnv]; 