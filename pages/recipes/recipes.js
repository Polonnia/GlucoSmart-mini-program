const { http, API } = require('../../utils/request')

Page({
  data: {
    searchValue: '',
    mealTypes: ['全部', '早餐', '午餐', '晚餐', '加餐'],
    mealTypeIndex: 0,
    recipes: [],
    recipeHistory: []
  },

  onLoad: function() {
    // 从本地存储加载历史记录
    const history = wx.getStorageSync('recipeHistory') || []
    this.setData({
      recipeHistory: history
    })
    // 初始化时加载空列表
    this.setData({ recipes: [] })
  },

  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  searchRecipes: function() {
    // 由于后端没有搜索接口，这里只做本地过滤
    const filteredRecipes = this.data.recipes.filter(recipe => {
      const matchesKeyword = !this.data.searchValue || 
        recipe.name.toLowerCase().includes(this.data.searchValue.toLowerCase())
      const matchesMealType = this.data.mealTypeIndex === 0 || 
        recipe.mealType === this.data.mealTypes[this.data.mealTypeIndex]
      return matchesKeyword && matchesMealType
    })

    this.setData({ recipes: filteredRecipes })
  },

  onMealTypeChange: function(e) {
    this.setData({
      mealTypeIndex: e.detail.value
    })
    this.searchRecipes()
  },

  viewRecipeDetail: function(e) {
    const recipeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/recipe-detail/recipe-detail?id=${recipeId}`
    })
  },

  // 评分相关函数
  rateRecipe: async function(e) {
    const { recipeId, rating } = e.currentTarget.dataset
    try {
      await http.post('/update-pref', {
        recipe: recipeId,
        rating: rating * 2 // 将5星制转换为10分制
      })

      // 更新本地历史记录中的评分
      const history = this.data.recipeHistory
      const recipeIndex = history.findIndex(item => 
        item.recipes.includes(recipeId)
      )

      if (recipeIndex !== -1) {
        if (!history[recipeIndex].ratings) {
          history[recipeIndex].ratings = {}
        }
        history[recipeIndex].ratings[recipeId] = rating * 2

        this.setData({ recipeHistory: history })
        wx.setStorageSync('recipeHistory', history)
      }

      wx.showToast({
        title: '评分成功',
        icon: 'success'
      })
    } catch (err) {
      wx.showToast({
        title: '评分失败',
        icon: 'none'
      })
    }
  },

  // 添加到历史记录
  addToHistory: function(recipe) {
    const now = new Date()
    const historyItem = {
      time: now.toLocaleString(),
      mealType: recipe.mealType,
      recipes: [recipe.name],
      stats: recipe.stats,
      ratings: {}
    }

    const history = [historyItem, ...this.data.recipeHistory]
    this.setData({ recipeHistory: history })
    wx.setStorageSync('recipeHistory', history)
  }
}) 