// pages/orderInfo/orderInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sn:'',
    hotelInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    this.setData({
      sn: options.sn
    })
    this.getOrderInfo()
  },
  getOrderInfo() {
    let that = this
    app.util.request({
      url: '/w_order',
      data: {order_sn: that.data.sn},
      success: function(res) {
        that.setData({
          hotelInfo: res
        })
      }
    })
  },
  goHotelInfo(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotelInfo/hotelInfo?param='+id
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