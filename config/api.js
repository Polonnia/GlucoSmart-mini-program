const BASE_URL = 'http://localhost:3000/api' // ����ʵ�ʺ�˵�ַ�޸�

const API = {
  // ������Ϣ���
  health: {
    get: `${BASE_URL}/health`,
    update: `${BASE_URL}/health/update`
  },

  // �Ի����
  chat: {
    send: `${BASE_URL}/chat/send`
  },

  // ʳ�����
  recipes: {
    list: `${BASE_URL}/recipes`,
    search: `${BASE_URL}/recipes/search`,
    detail: `${BASE_URL}/recipes/detail`
  }
}

module.exports = API 