// pages/assess/assess.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sn: '',
    value: 0,
    txtContent: '',
    txtHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布评论',
    })
    this.setData({
      sn: options.sn
    })
  },
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  txtInput(e) {
    this.setData({ txtContent: e.detail.value })
  },
  textAreaLineChange(e) {
    this.setData({ txtHeight: e.detail.height })
  },
  bindButtonTap() {
    let that = this
    let val = that.data.value,
        remark = that.data.txtContent,
        pages = getCurrentPages(),
        beforePage = pages[pages.length - 2]
    app.util.request({
      url: '/w_comment',
      data: {order_sn: that.data.sn, score: val, content: remark},
      method: 'POST',
      success: (res) => {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            wx.navigateBack({
              delta: 1,
              success: function (e) {
                beforePage.onLoad()
              }
            })
          }
        })
      },
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