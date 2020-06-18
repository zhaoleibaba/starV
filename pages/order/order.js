// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    active: 0,
    page: 1,
    pageCount: 1,
    status: 0,
    orderList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
    this.getOrderList()
  },
  getOrderList() {
    let that = this
    app.util.request({
      url: '/w_orders',
      data: {page: that.data.page, status: that.data.status},
      success: function(res) {
        let result = res.order_list
        if (that.data.page == 1 && result.length == 0){
          that.setData({
            noData:true
          })
        }
        if (result.length) {
          that.data.pageCount = res.pageCount
          that.data.page = res.page
          let deviceListTemp= []
          if (that.data.page > 1) {
            deviceListTemp = that.data.orderList.concat(result);
            that.setData({
              searchLoading: true,
            });
          } else {
            deviceListTemp = result;
          }
          that.setData({
            orderList: deviceListTemp,
            noData: false
          })
        }
      }
    })
  },
  statusYN(){
    return n==1 ? "去支付":(n==2 ? "待确认" : ( n==3 ? "已完成" : "已退款"))
  },
  scrollLower: function () {
    let that = this
    if (that.data.page < that.data.pageCount) {
      that.setData({
        page: that.data.page + 1
      });
      that.getOrderList();
    } else if (that.data.page == that.data.pageCount) {
      that.setData({
        loadingComplete: true,
      });
    }
  },
  goOrderInfo(e) {
    let that = this, sn = e.currentTarget.dataset.sn
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo?sn='+sn,
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
  onChange(e) {
    console.log()
    let that = this, index = e.detail.index
    that.setData({
      page: 1,
      status: index
    })
    that.getOrderList();
  },
  statusBtn(e) {
    let status = e.currentTarget.dataset.status
    switch(status) {
      case 1: 
        console.log('支付接口')
        break
        case 3: 
          let cancomment = e.currentTarget.dataset.cancomment, sn=e.currentTarget.dataset.sn
          if(cancomment == 0) return
          wx.navigateTo({
            url: '/pages/assess/assess?sn='+sn,
          })
          break
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
    console.log(111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})