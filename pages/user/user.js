// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    showMobile: false,
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    let that = this, getUserMobile = wx.getStorageSync('mobile')
    console.log(getUserMobile)
        if(getUserMobile) {
          that.setData({
            showMobile: true,
            mobile: getUserMobile
          })
        }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUserInfo: function (e) {
    var that = this
    var wxUserInfo = e.detail.userInfo
    if(wxUserInfo) {
      wx.setStorageSync("userInfo",wxUserInfo)
      //获取用户信息，只要根据自己需求单独存起来就好了。
      var userInfo = {}
      userInfo.head_photo = wxUserInfo.avatarUrl
      userInfo.nick_name = wxUserInfo.nickName
      userInfo.gender = wxUserInfo.gender
      userInfo.country = wxUserInfo.country
      userInfo.country = wxUserInfo.city
      userInfo.country = wxUserInfo.province
      that.setData({
        user_info: userInfo
      })
      console.log(that.data.user_info)
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    that.wxlogin()
  },
  wxlogin() {
    var that = this;
    //调用共通的登录方法
    app.util.getUserInfo(
      function(userinfo) {
        console.log(userinfo)
        that.setData({
          userinfo: userinfo
        })
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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