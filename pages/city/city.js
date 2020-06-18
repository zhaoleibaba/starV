// pages/city/city.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityItems:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择城市',
    })
    this.getCityInfo()
  },
  getCityInfo() {
    let that = this
    app.util.request({
      url: '/w_city',
      success: function(res) {
        that.setData({
          cityItems: res
        })
      }
    })
  },
  chooseCity(e) {
    let cityPy = e.currentTarget.dataset.py, cityName = e.currentTarget.dataset.name, id = e.currentTarget.dataset.id, code= e.currentTarget.dataset.code
    wx.setStorageSync('hotelObj', {
      city: cityPy,
      region: 0,
      activity: 0,
      join_members: 0,
      expenses: 0,
      tag: 0,
      wd: 0,
      page: 1
    })
    wx.setStorageSync('cityInfo', {
      cityName: cityName,
      cityID: id,
      cityPy: cityPy,
      cityCode: code
    })
    wx.reLaunch({
      url: '/pages/space/space',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})