const { http, API } = require('../../utils/request')

Page({
  data: {
    searchValue: '',
    mealTypes: ['全部', '早餐', '午餐', '晚餐', '加餐'],
    mealTypeIndex: 0,
    difficulties: ['全部', '简单', '中等', '复杂'],
    difficultyIndex: 0,
    recipes: [],
    recipeHistory: []
  },

  onLoad: function() {
    // 从本地存储加载历史记录
    const history = wx.getStorageSync('recipeHistory') || []
    this.setData({
      recipeHistory: history
    })
    this.loadRecipes()
  },

  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  searchRecipes: async function() {
    try {
      const res = await http.get(API.recipes.search, {
        keyword: this.data.searchValue,
        mealType: this.data.mealTypeIndex > 0 ? this.data.mealTypes[this.data.mealTypeIndex] : '',
        difficulty: this.data.difficultyIndex > 0 ? this.data.difficulties[this.data.difficultyIndex] : ''
      })

      // 处理返回的食谱数据
      const recipes = res.data.map(recipe => ({
        ...recipe,
        stats: {
          healthScore: recipe.health_score,
          energy: recipe.energy,
          predictedGlucose: recipe.PBG,
          carb: recipe.carb,
          protein: recipe.protein,
          fat: recipe.fat,
          fiber: recipe.fiber
        }
      }))

      this.setData({ recipes })
    } catch (err) {
      wx.showToast({
        title: '搜索失败',
        icon: 'none'
      })
    }
  },

  onMealTypeChange: function(e) {
    this.setData({
      mealTypeIndex: e.detail.value
    })
    this.searchRecipes()
  },

  onDifficultyChange: function(e) {
    this.setData({
      difficultyIndex: e.detail.value
    })
    this.searchRecipes()
  },

  loadRecipes: async function() {
    try {
      const res = await http.get(API.recipes.list)
      
      // 处理返回的食谱数据
      const recipes = res.data.map(recipe => ({
        ...recipe,
        stats: {
          healthScore: recipe.health_score,
          energy: recipe.energy,
          predictedGlucose: recipe.PBG,
          carb: recipe.carb,
          protein: recipe.protein,
          fat: recipe.fat,
          fiber: recipe.fiber
        }
      }))

      this.setData({ recipes })
    } catch (err) {
      wx.showToast({
        title: '获取食谱列表失败',
        icon: 'none'
      })
    }
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
      await http.post(API.recipes.rate, {
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