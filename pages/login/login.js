// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登陆',
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
  getPhoneNumber (e) {
    console.log(e)
    // var that = this
    // var ency = e.detail.encryptedData;
    // var iv = e.detail.iv;
    // var errMsg = e.detail.errMsg
    // if (iv == null || ency == null) {
    //     wx.showToast({
    //       title: "授权失败,请重新授权！",
    //       icon: 'none',
    //     })
    //     return false
    // }
    // //把获取手机号需要的参数取到，然后存到头部data里面
    // that.setData({
    //     ency: ency,
    //     iv: iv,
    //     errMsg: errMsg
    // })

    // that.zhuce();//调用手机号授权事件
  },
  wxLogin: function () {
    //调用登录接口
    var that = this
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        console.log(res,'-------res')//res中就有所有的用户基本信息
        // that.globalData.userInfo = res.userInfo
        // typeof cb == "function" && cb(that.globalData.userInfo)
      }
    })
    // wx.login({
    //   success(res) {
    //     console.log(res.code)
    //     if (res.code) {
    //       //发起网络请求 wxaa4bf52d30f64d42 bf698208c3325aa403c26e344d5cea77
    //       wx.request({
    //         url: 'https://apixhc.syparking.net',
    //         data: {
    //           code: res.code
    //         },
    //         header: {
    //           'content-type': 'application/json'
    //         },
    //         success: function (res) {
    //           console.log(res.data)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  otherLogin() {
    wx.navigateTo({
      url: '/pages/phone/phone',
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