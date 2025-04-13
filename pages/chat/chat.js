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
        title: '��ȡ�����¼ʧ��',
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

    // ����û���Ϣ��������ʷ
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
      // ������Ϣ�����
      const res = await http.post(API.chat.send, {
        message: message
      })

      // ���AI�ظ���������ʷ
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
        title: '������Ϣʧ��',
        icon: 'none'
      })
    }
  }
}) 