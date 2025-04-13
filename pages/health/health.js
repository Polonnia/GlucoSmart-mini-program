const { http, API } = require('../../utils/request')

Page({
  data: {
    height: '',
    weight: '',
    age: '',
    fastingBloodSugar: '',
    postprandialBloodSugar: '',
    complication: false,
    insulin: false
  },

  onLoad: function() {
    this.loadHealthInfo()
  },

  loadHealthInfo: async function() {
    try {
      const res = await http.get(API.health.get)
      this.setData(res.data)
    } catch (err) {
      wx.showToast({
        title: '获取健康信息失败',
        icon: 'none'
      })
    }
  },

  onHeightInput: function(e) {
    this.setData({
      height: e.detail.value
    })
  },

  onWeightInput: function(e) {
    this.setData({
      weight: e.detail.value
    })
  },

  onAgeInput: function(e) {
    this.setData({
      age: e.detail.value
    })
  },

  onFastingInput: function(e) {
    this.setData({
      fastingBloodSugar: e.detail.value
    })
  },

  onPostprandialInput: function(e) {
    this.setData({
      postprandialBloodSugar: e.detail.value
    })
  },

  onComplicationChange: function(e) {
    this.setData({
      complication: e.detail.value === '1'
    })
  },

  onInsulinChange: function(e) {
    this.setData({
      insulin: e.detail.value === '1'
    })
  },

  saveHealthInfo: async function() {
    if (!this.validateData()) {
      return
    }

    try {
      await http.post(API.health.update, this.data)
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
    } catch (err) {
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      })
    }
  },

  validateData: function() {
    const { height, weight, age, fastingBloodSugar, postprandialBloodSugar } = this.data

    if (!height || !weight || !age) {
      wx.showToast({
        title: '请填写基本信息',
        icon: 'none'
      })
      return false
    }

    if (isNaN(height) || height <= 0) {
      wx.showToast({
        title: '请输入正确的身高',
        icon: 'none'
      })
      return false
    }

    if (isNaN(weight) || weight <= 0) {
      wx.showToast({
        title: '请输入正确的体重',
        icon: 'none'
      })
      return false
    }

    if (isNaN(age) || age <= 0) {
      wx.showToast({
        title: '请输入正确的年龄',
        icon: 'none'
      })
      return false
    }

    if (fastingBloodSugar && (isNaN(fastingBloodSugar) || fastingBloodSugar <= 0)) {
      wx.showToast({
        title: '请输入正确的空腹血糖值',
        icon: 'none'
      })
      return false
    }

    if (postprandialBloodSugar && (isNaN(postprandialBloodSugar) || postprandialBloodSugar <= 0)) {
      wx.showToast({
        title: '请输入正确的餐后血糖值',
        icon: 'none'
      })
      return false
    }

    return true
  }
}) 