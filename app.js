App({
  globalData: {
    userInfo: null,
    healthInfo: null,
    chatHistory: []
  },
  onLaunch: function() {
    // ��ȡ�û���Ϣ
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
}) 