// pages/hotelInfo/hotelInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel_id: '',
    currentIndex: 0,
    color: '#f2f2f2',
    isCollect: false,
    collectText: '收藏',
    hotel: {},
    group: {},
    packageBox: [],
    meetingBox: {},
    spaceBox:{},
    roomBox: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '酒店详情',
    })
    var that = this
    that.setData({
      hotel_id: options.param
    })
    that.getHotelInfo()
  },
  getHotelInfo() {
    let that = this
    app.util.request({
      url: '/w_hotel',
      data: {id: that.data.hotel_id},
      success: function(res) {
        that.setData({
          hotel: res.hotel,
          group: res.group,
          packageBox: res.package,
          meetingBox: res.venue,
          spaceBox: res.specialty,
          roomBox: res.room
        })
        if (res.hotel.fav == 1) {
          that.setData({
            color: '#EC524C',
            isCollect: true,
            collectText: '已收藏'
          })
        }else{
          that.setData({
            color: '#f2f2f2',
            isCollect: false,
            collectText: '收藏'
          })
        }
      }
    })
  },
  collectSelect() {
    let that = this
    app.util.request({
      url: '/w_favorite',
      method: 'POST',
      data: {hotel_id: that.data.hotel_id},
      success: function(res) {
        if(that.data.isCollect){
          that.setData({
            color: '#f2f2f2',
            isCollect: false,
            collectText: '收藏'
          })
        }else{
          that.setData({
            color: '#EC524C',
            isCollect: true,
            collectText: '已收藏'
          })
        }
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
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = currentPageIndex + 1
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  callMe: function(e) {
    let id = e.currentTarget.dataset.id, source = e.currentTarget.dataset.source
    console.log(id, source)
    app.util.request({
      url: '/w_callme',
      method: 'POST',
      data: {id: id, source: source},
      success: function(res) {
        wx.showModal({
          title: '温馨提示',
          content: res.text,
          showCancel: false
        })
      },
      fail: function(err) {
        console.log(err.data)
        wx.showModal({
          title: '温馨提示',
          content: err.data.msg,
          showCancel: false
        })
      }
    })
  },
  _goHotelInfo: function(e) {
    wx.navigateTo({
      url: '/pages/meetInfo/meetInfo?id='+e.currentTarget.dataset.id,
    })
  },
  toReserve: function(e) {
    wx.navigateTo({
      url: '/pages/reserve/reserve?cid='+e.currentTarget.dataset.id+'&hid='+this.data.hotel_id
    })
  },
  viewImg(e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
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