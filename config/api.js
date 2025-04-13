const BASE_URL = 'http://localhost:3000/api' // 根据实际后端地址修改

const API = {
  // 健康信息相关
  health: {
    get: `${BASE_URL}/health`,
    update: `${BASE_URL}/health/update`
  },

  // 对话相关
  chat: {
    send: `${BASE_URL}/chat/send`
  },

  // 食谱相关
  recipes: {
    list: `${BASE_URL}/recipes`,
    search: `${BASE_URL}/recipes/search`,
    detail: `${BASE_URL}/recipes/detail`
  }
}

module.exports = API 