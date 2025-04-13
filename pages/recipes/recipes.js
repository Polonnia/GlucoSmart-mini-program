const { http, API } = require('../../utils/request')

Page({
  data: {
    searchValue: '',
    mealTypes: ['ȫ��', '���', '���', '���', '�Ӳ�'],
    mealTypeIndex: 0,
    difficulties: ['ȫ��', '��', '�е�', '����'],
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
        title: '����ʧ��',
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
        title: '��ȡʳ���б�ʧ��',
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