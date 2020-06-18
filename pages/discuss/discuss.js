// pages/discuss/discuss.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel_id: '',
    discuss: [],
    page: 1,
    pageCount: 0,
    loadingComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '评论',
    })
    this.data.hotel_id = options.id
    this.getDiscuss()
  },
  getDiscuss() {
    let that = this
    app.util.request({
      url: '/w_comments',
      data: {id:that.data.hotel_id, page:that.data.page},
      success: function(res) {
        let result = res.list
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
            deviceListTemp = that.data.hotelList.concat(result);
            that.setData({
              searchLoading: true,
            });
          } else {
            deviceListTemp = result;
          }
          that.setData({
            discuss: deviceListTemp,
            noData: false
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
    let that = this
    console.log(that.data.page, that.data.pageCount)
    if (that.data.page < that.data.pageCount) {
      that.setData({
        page: that.data.page + 1
      });
      that.getDiscuss();
    } else if (that.data.page == that.data.pageCount) {
      that.setData({
        loadingComplete: true,
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})