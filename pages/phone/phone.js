// pages/phone/phone.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    password: '',
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: true,
    plain: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '手机号登陆',
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
  formMobile: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  formPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  tologin() {
    let that = this
    let mobile = that.data.mobile, password = that.data.password
    if( mobile.length<11 || password.length<8) {
      wx.showToast({
        title: `号码或密码有误,重新输入`,
        icon: 'none',
        duration: 2000
      });
      return
    }
    app.util.request({
      url : '/w_login',
      method: 'POST',
      data: {mobile, password},
      success: function(res) {
        if(res) {
          wx.setStorageSync('token', res.token)
          wx.setStorageSync('mobile', res.mobile)
        }
        wx.navigateBack({
          delta: 2
        })
      },
      fail: function(err) {
        wx.showModal({
          title: '轻提示',
          content: err.data.msg,
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
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