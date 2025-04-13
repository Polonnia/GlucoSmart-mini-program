# 糖尿病饮食助手小程序

## 项目结构
```
mini-program/
├── app.js                 # 小程序入口文件
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
├── config/                # 配置文件目录
│   └── api.js            # API接口配置
├── utils/                 # 工具函数目录
│   └── request.js        # 网络请求工具
├── pages/                 # 页面文件目录
│   ├── index/            # 首页
│   ├── health/           # 健康信息页面
│   ├── chat/             # 对话页面
│   └── recipes/          # 食谱页面
└── images/               # 图片资源目录
```

## 后端接口说明

具体参照糖小智主项目 [Diabetes-Recipe-Recommender](https://github.com/Polonnia/Diabetes-Recipe-Recommender)

API地址：`https://dominant-bunny-feasible.ngrok-free.app`

> 注意事项：
> - 需要开启代理
> - 需要在本机运行后端服务器

### 1. 健康信息接口
- 获取健康信息
  ```
  GET /api/user-data
  返回数据：
  {
    height: number,          // 身高(cm)
    weight: number,          // 体重(kg)
    age: number,             // 年龄
    gender: string,          // 性别
    pre_meal_glucose: number, // 餐前血糖(mmol/L)
    pre_meal_insulin: number, // 餐前胰岛素(单位)
    activity_level: string,   // 活动水平
    TDEE: number             // 每日总能量消耗
  }
  ```

- 更新健康信息
  ```
  POST /api/user-data
  请求数据：
  {
    height: number,
    weight: number,
    age: number,
    gender: string,
    pre_meal_glucose: number,
    pre_meal_insulin: number,
    activity_level: string
  }
  ```

### 2. 对话接口
- 发送消息
  ```
  POST /chat
  请求数据：
  {
    message: string,         // 用户消息
    user_data: {            // 用户健康数据
      height: number,
      weight: number,
      age: number,
      gender: string,
      pre_meal_glucose: number,
      pre_meal_insulin: number,
      activity_level: string
    }
  }
  返回数据：
  {
    message: string,         // AI回复内容
    recipes: string[],      // 推荐的食谱（如果是食谱推荐）
    mealType: string,       // 餐次类型
    health_score: number,   // 健康评分
    energy: number,         // 能量(kcal)
    PBG: number,           // 预测餐后血糖
    carb: number,          // 碳水化合物(g)
    protein: number,       // 蛋白质(g)
    fat: number,           // 脂肪(g)
    fiber: number          // 膳食纤维(g)
  }
  ```

### 3. 食谱接口
- 评分食谱
  ```
  POST /update-pref
  请求数据：
  {
    recipe: string,         // 食谱名称
    rating: number          // 评分(0-10)
  }
  ```

## 本地存储说明

小程序使用 `wx.setStorageSync` 和 `wx.getStorageSync` 进行本地数据存储：

1. 健康信息
   ```javascript
   wx.setStorageSync('userData', {
     height: number,
     weight: number,
     age: number,
     gender: string,
     pre_meal_glucose: number,
     pre_meal_insulin: number,
     activity_level: string,
     TDEE: number
   })
   ```

2. 食谱历史
   ```javascript
   wx.setStorageSync('recipeHistory', [{
     time: string,          // 时间戳
     mealType: string,      // 餐次类型
     recipes: string[],     // 食谱列表
     stats: {              // 营养信息
       healthScore: number,
       energy: number,
       PBG: number,
       carb: number,
       protein: number,
       fat: number,
       fiber: number
     },
     ratings: {            // 评分记录
       [recipeName]: number
     }
   }])
   ```

3. 聊天历史
   ```javascript
   wx.setStorageSync('chatHistory', [{
     role: string,         // 'user' 或 'assistant'
     content: string       // 消息内容
   }])
   ```