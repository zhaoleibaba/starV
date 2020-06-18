// pages/reset/reset.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    password: '',
    isPassword: '',
    disabled: false,
    isDisabled: true,
    codename: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '重置密码',
    })
    let phone = wx.getStorageSync('mobile')
    this.setData({
      phone
    })
  },

  getCode:function(){
    let that = this
    let phone = that.data.phone;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      wx.showToast({
        title: `验证码已发送 注意查收`,
        icon: 'none',
        duration: 2000
      });
      app.util.request({
        url: '/sendcode',
        method: 'POST',
        showLoading: false,
        data: {mobile: phone, type: 2},
        success: function(res) {
          var num = 60;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              that.setData({
                codename: '重新发送',
                disabled: false
              })
 
            } else {
              that.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        },
        fail: function(err) {
          wx.showToast({
            title: err.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      })
    }
  },
  getCodeValue(e) {
    if(e.detail.value.length==6){
      this.setData({
        isDisabled: false
      })
    }
    this.setData({
      code: e.detail.value
    })
  },
  getPasswordValue(e) {
    this.setData({
      password: e.detail.value
    })
  },
  getPasswordAgainValue(e) {
    this.setData({
      isPassword: e.detail.value
    })
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  resetSuccess() {
    let that = this
    let mobile = that.data.phone, code = that.data.code, password = that.data.password, password_repeat = that.data.isPassword
    app.util.request({
      url: '/w_resetpassword',
      method: 'POST',
      showLoading: false,
      data: {mobile, password, password_repeat, code},
      success: function(res) {
        wx.removeStorageSync('token')
        wx.setStorageSync('token', res.token)
        wx.navigateBack({
          complete: (res) => {},
        })
      },
      fail: function(err) {
        wx.showToast({
          title: err.data.msg,
          icon: 'none',
          duration: 1000
        });
        that.setData({
          disabled: false
        })
      }
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

  },
})