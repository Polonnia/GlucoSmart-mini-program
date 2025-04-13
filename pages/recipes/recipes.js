const { http, API } = require('../../utils/request')

Page({
  data: {
    searchValue: '',
    mealTypes: ['全部', '早餐', '午餐', '晚餐', '加餐'],
    mealTypeIndex: 0,
    difficulties: ['全部', '简单', '中等', '复杂'],
    difficultyIndex: 0,
    recipes: []
  },

  onLoad: function() {
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
      this.setData({
        recipes: res.data
      })
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
      this.setData({
        recipes: res.data
      })
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
  }
}) 