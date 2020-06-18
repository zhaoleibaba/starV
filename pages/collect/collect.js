// pages/collect/collect.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelList: [],
    page: 1,
    pageCount: 0,
    loadingComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的收藏',
    })
    this.getCollectList()
  },
  getCollectList() {
    let that = this
    app.util.request({
      url: '/w_favorites',
      data: {page: that.data.page},
      success: function(res) {
        let result = res.hotel_list
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
            hotelList: deviceListTemp,
            noData: false
          })
        }
      }
    })
  },
  cancelCollect(e) {
    let that = this, hotelID = e.currentTarget.dataset.id, index = e.currentTarget.dataset.index
    that.data.hotelList.splice(that.data.hotelList.indexOf(index),1)
    app.util.request({
      url: '/w_favorite',
      method: 'POST',
      data: {hotel_id: hotelID},
      success: function(res) {
        that.data.hotelList.splice(index,1)
        that.setData({
          hotelList: that.data.hotelList,
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  scrollLower: function () {
    let that = this
    if (that.data.page < that.data.pageCount) {
      that.setData({
        page: that.data.page + 1
      });
      that.getCollectList();
    } else if (that.data.page == that.data.pageCount) {
      that.setData({
        loadingComplete: true,
      });
    }
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