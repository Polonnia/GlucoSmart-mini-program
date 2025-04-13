const API = require('../config/api')

const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // token���ڣ���Ҫ���µ�¼
          wx.removeStorageSync('token')
          wx.navigateTo({
            url: '/pages/login/login'
          })
          reject(new Error('��¼�ѹ���'))
        } else {
          reject(new Error(res.data.message || '����ʧ��'))
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const http = {
  get: (url, data) => request(url, 'GET', data),
  post: (url, data) => request(url, 'POST', data),
  put: (url, data) => request(url, 'PUT', data),
  delete: (url, data) => request(url, 'DELETE', data)
}

module.exports = {
  http,
  API
} 