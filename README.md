# UniMart - 校园二手交易平台

UniMart是一个基于Vue.js开发的校园二手交易平台前端项目，旨在为校园师生提供一个便捷的二手物品交易平台。

## 功能特性

- 用户认证
  - 账号注册
  - 用户登录
  - 密码找回

- 商品管理
  - 商品发布
  - 商品搜索
  - 分类浏览
  - 商品详情
  - 商品编辑
  - 商品下架

- 交易系统
  - 在线交易
  - 交易记录
  - 支付管理
  - 订单状态跟踪

- 即时通讯
  - 买卖双方实时沟通
  - 消息提醒
  - 未读消息统计

- 用户中心
  - 个人信息管理
  - 我的商品
  - 交易记录
  - 账号设置

## 技术栈

- Vue.js 2.x
- Vuex
- Vue Router
- Element UI
- Axios

## 项目设置

### 环境要求

- Node.js >= 12.x
- npm >= 6.x

### 安装依赖
```bash
npm install
```

### 运行项目
```bash
npm run dev
```
## 项目结构
```
src/
├── api/ # API接口
├── assets/ # 静态资源
├── components/ # 公共组件
├── router/ # 路由配置
├── store/ # Vuex状态管理
├── utils/ # 工具函数
└── views/ # 页面组件
```
## API接口

项目使用RESTful API，主要包括以下模块：

- 用户认证 (/auth)
- 商品管理 (/products)
- 交易管理 (/transactions)
- 消息系统 (/messages)
- 文件上传 (/upload)

## 环境变量

项目使用以下环境变量：
VUE_APP_API_BASE_URL=http://localhost:3000