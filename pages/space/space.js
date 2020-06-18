// pages/space/space.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    on: false,
    noData: false,
    loadingComplete: false,
    cityName: '上海市',
    cityId: 788,
    cid: '',
    input: '',
    pageCount: 0,
    mainActiveIndex: 0,
    hotellist:[],
    dropDownMenuRightData:[],
    dropDownMenuTitle: ['地理位置', '分类筛选'],
    dropDownMenuDistrictData: [],
    hotelData: {},
    city: 'shanghai',
    region: 0,
    activity: 0,
    join_members: 0,
    expenses: 0,
    tag: 0,
    page: 1,
    height: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '找会场',
    })
    var that = this
    let obj = wx.getStorageSync('hotelObj'), cityInfo = wx.getStorageSync('cityInfo')
    that.setData({height: app.globalData.height})
    if(obj) {
      that.setData({
        hotelData: obj,
        cityName: cityInfo.cityName,
        cityId: cityInfo.cityID,
        city: cityInfo.cityPy,
        region: obj.region,
        activity: obj.activity,
        join_members: obj.join_members,
        expenses: obj.expenses,
        tag: obj.tag,
      })
    }else{
      that.setData({
        city: that.data.city,
        region: 0,
        activity: 0,
        join_members: 0,
        expenses: 0,
        tag: 0
      })
    }
    that.getCityInfo()
    that.getHotelItems()
    that.setDropMenuRight()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  confirm: function(e) {
    let cityInfo = wx.getStorageSync('cityInfo'), that = this
    that.setData({
      hotellist: [],
    })
    app.util.request({
      url: '/search',
      data: {cc: cityInfo.cityCode, wd: e.detail.value, page:1},
      success: res=> {
        
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
            deviceListTemp = that.data.hotellist.concat(result);
            that.setData({
              searchLoading: true, //"正在载入更多"显示
            });
          } else {
            deviceListTemp = result;
          }
          that.setData({
            hotellist: deviceListTemp,
            noData: false
          })
        }else{
          console.log(222)
          that.setData({
            noData: true
          })
        }
      }
    })
  },
  getCityInfo() {
    var that = this
    app.util.request({
      url: '/w_city',
      data: that.data.hotelData,
      success: function(res) {
        that.setData({
          actions: res
        })
        that.getAreaRegion()
      }
    })
  },
  getAreaRegion() {
    let that = this
    app.util.request({
      url: '/w_region',
      data: {city_id: that.data.cityId},
      success: function(res) {
        that.setData({
          dropDownMenuDistrictData: res
        })
      }
    })
  },
  getHotelItems() {
    var that = this, hotelParams = {}
    hotelParams.city = that.data.city
    hotelParams.region = that.data.region
    hotelParams.activity = that.data.activity
    hotelParams.join_members = that.data.join_members
    hotelParams.expenses = that.data.expenses
    hotelParams.tag = that.data.tag
    hotelParams.page = that.data.page
    app.util.request({
      url: '/hoteldata',
      data: hotelParams,
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
            deviceListTemp = that.data.hotellist.concat(result);
            that.setData({
              searchLoading: true, //"正在载入更多"显示
            });
          } else {
            deviceListTemp = result;
          }
          that.setData({
            hotellist: deviceListTemp,
            noData: false
          })
        }
      }
    })
  },
  // 滚动至低端事件
  scrollLower: function () {
    var that = this;
    console.log(111)
    if (that.data.page < that.data.pageCount) {
      that.setData({
        page: that.data.page + 1
      });
      that.getHotelItems();
    } else if (that.data.page == that.data.pageCount) {
      that.setData({
        loadingComplete: true,
      });
    }
  },
  setDropMenuRight() {
    let that = this
    app.util.request({
      url: '/w_searchparams',
      success: function(res) {
        that.setData({
          dropDownMenuRightData: res
        })
      }
    })
  },
  _goHotelInfo(e) {
    wx.navigateTo({
      url: '/pages/hotelInfo/hotelInfo?param='+e.currentTarget.dataset.id,
    })
  },
  selectedItem: function (e) {
    let that = this
    that.setData({
      city: that.data.city,
      region: e.detail.region,
      activity: e.detail.activity,
      join_members: e.detail.join_members,
      expenses: e.detail.expenses,
      tag: e.detail.tag,
      page: that.data.page
    })
    that.getHotelItems()
  },
  conditionSelect: function(e) {
    let that = this
    that.setData({
      city: that.data.city,
      region: e.detail.region,
      activity: e.detail.activity,
      join_members: e.detail.join_members,
      expenses: e.detail.expenses,
      tag: e.detail.tag,
      page: that.data.page
    })
    that.getHotelItems()
  },
  chooseCity() {
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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

})