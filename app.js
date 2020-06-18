//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取用户本地是否是第一次进入新版本
    var versions = wx.getStorageSync('versions');
    console.log('versions:' + versions);
    //判断是不是需要授权
    if (versions == '1'){
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          console.log(that.globalData.userInfo)
        },
        fail: function () {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      })
    }
    // else{
    //   //未授权, 跳转登录页面
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // }
    let that = this;
    wx.getSystemInfo({
      success: res => {
      let modelmes = res.model;
      if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhone 11') != -1) {
        that.globalData.isIphoneX = true
        that.globalData.height = 150
      }
      wx.setStorageSync('modelmes', modelmes)
      }
    })
  },
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  toRedirect: function () {
    wx.navigateTo({
      url: '/pages/login/login?type='+1,
    })
  },
  siteInfo: require('./utils/siteinfo.js'),
  util: require('./utils/util.js'),
  globalData: {
    height: 100,
    isIphoneX: false,
    locationInfo: '',
    userInfo: {},
    cityName: '',
    cityId: '',
    isShow: false
  },
})