const { http, API } = require('../../utils/request')

Page({
  data: {
    inputValue: '',
    chatHistory: [],
    scrollToView: ''
  },

  onLoad: function() {
    this.loadChatHistory()
  },

  loadChatHistory: async function() {
    try {
      const res = await http.get(API.chat.history)
      this.setData({
        chatHistory: res.data
      })
    } catch (err) {
      wx.showToast({
        title: '获取聊天记录失败',
        icon: 'none'
      })
    }
  },

  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  sendMessage: async function() {
    const message = this.data.inputValue.trim()
    if (!message) return

    // 添加用户消息到聊天历史
    const userMessage = {
      role: 'user',
      content: message
    }

    const newChatHistory = [...this.data.chatHistory, userMessage]
    this.setData({
      chatHistory: newChatHistory,
      inputValue: '',
      scrollToView: `msg-${newChatHistory.length - 1}`
    })

    try {
      // 发送消息到后端
      const res = await http.post(API.chat.send, {
        message: message
      })

      // 添加AI回复到聊天历史
      const aiMessage = {
        role: 'assistant',
        content: res.data.reply
      }

      const updatedChatHistory = [...newChatHistory, aiMessage]
      this.setData({
        chatHistory: updatedChatHistory,
        scrollToView: `msg-${updatedChatHistory.length - 1}`
      })
    } catch (err) {
      wx.showToast({
        title: '发送消息失败',
        icon: 'none'
      })
    }
  }
}) 