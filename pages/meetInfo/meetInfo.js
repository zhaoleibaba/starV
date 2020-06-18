// pages/meetInfo/meetInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomID: '',
    meet:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '会议室、客房详情',
    })
    console.log(options.id)
    this.setData({
      roomID: options.id
    })
    this.getMeetingInfo()
  },
  getMeetingInfo() {
    let that = this
    app.util.request({
      url: '/w_room',
      data: {id: that.data.roomID},
      success: function(res) {
        that.setData({
          meet: res
        })
      }
    })
  },
  viewImg(e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
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