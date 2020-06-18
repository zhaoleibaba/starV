//index.js
var Moment = require("../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
//获取应用实例
const app = getApp()
Page({
  data: {
    cityName: "您在哪个城市举办活动？",
    cityId: "",
    cid: "",
    lid: "",
    pid: "",
    bid: "",
    aid: "",
    sid: "",
    checkInDate: "日期",
    longTime: "活动时长",
    appendPeople: "参与人数",
    budget: "大致预算",
    activity: "活动类型",
    space: "场地特别需求",
    checkOutDate: "",
    dataType: 0,
    cityItems: [],
    times:[],
    appendNum: [],
    budgetItems: [],
    activityItems: [],
    spaceItems: [],
    show: false,
    round: false,
    actions: [
      { name: '1小时', color: '4a4a4a' },
      { name: '2小时', color: '4a4a4a' },
      { name: '3小时', color: '4a4a4a' },
      { name: '上午半天', color: '4a4a4a' },
      { name: '下午半天', color: '4a4a4a' },
      { name: '晚上', color: '4a4a4a' },
      { name: '全天', color: '4a4a4a' },
      { name: '1天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' },
      { name: '2天', color: '4a4a4a' }
    ]
  },
  onReady() {
    
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    //设缓存缓存起来的日期
    // wx.setStorage({
    //   key: 'ROOM_SOURCE_DATE',
    //   data: {
    //     checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
    //     // checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
    //   }
    // });
    var that = this
    this.getProjectList()
    this.getCityList()
  },
  onShow: function (e) {
    let that = this


    app.globalData.isShow = true
    if (typeof that.getTabBar === 'function' &&
        that.getTabBar()) {
        that.getTabBar().setData({
          selected: 0,
          isShow: app.globalData.isShow
        })
      }
    
    //  获取全局参数，在上一个页面赋值的
    let cityName = app.globalData.cityName;
    let cityId = app.globalData.cityId;

    //判断是否带参数，带的话执行里边逻辑
    if (cityName != '') {
      that.setData({
        cityName: cityName,
        cityId: cityId
      });
    }
    let { checkInDate} = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: checkInDate
    })
    //  记得，一定要还原全局数据
    // app.globalData.cityName = "您在哪个城市举办活动？"
    // app.globalData.cityId = ''
  },
  getProjectList: function(e) {
    let that = this
    app.util.request({
      url: '/w_searchparams',
      success: function(res) {
        var data = res
        data.forEach((item,index) => {
          if (item.type == 1) {
            that.setData({
              activityItems: item.children
            })
          }else if (item.type == 2){
            that.setData({
              appendNum: item.children
            })
          }else if (item.type == 3){
            that.setData({
              budgetItems: item.children
            })
          }else if (item.type == 4){
            that.setData({
              times: item.children
            })
          }else if (item.type == 5){
            that.setData({
              spaceItems: item.children
            })
          }
        })
      }
    })
  },
  getCityList: function(e) {
    let that = this
    app.util.request({
      url: '/w_city',
      success: function(res) {
        var data = res, cityArr = []

        // data.forEach((item,i) => {
        //   console.log(item)
        //   cityArr.push({
        //     id: item.city_id,
        //     name: item.city_name
        //   })
        // })
        that.setData({
          cityItems: data
        })
      }
    })
  },
  chooseCity() {
    this.setData({
      actions: this.data.cityItems,
      show: true,
      dataType: 1
    })
    // wx.navigateTo({
    //   url: '/pages/indexbar/indexbar',
    // })
  },


  onClose() {
    this.setData({ show: false });
  },
  showActivityTime() {
    this.setData({
      actions: this.data.times,
      show: true,
      dataType: 2
    });
  },
  showActivityPeople() {
    this.setData({
      actions: this.data.appendNum,
      show: true,
      dataType: 3
    });
  },
  showActivityBudget() {
    this.setData({
      actions: this.data.budgetItems,
      show: true,
      dataType: 4
    });
  },
  showActivityActivity() {
    this.setData({
      actions: this.data.activityItems,
      show: true,
      dataType: 5
    });
  },
  showActivitySpace() {
    this.setData({
      actions: this.data.spaceItems,
      show: true,
      dataType: 6
    });
  },
  onSelect(e) {
    let type = e.currentTarget.dataset.type, val = e.detail.name, _cid = e.detail.id
    switch (type) {
      case 1: 
        this.data.sid = e.detail.id, this.data.cityCode = e.detail.code
        this.setData({
          cityName: val,
          cid: e.detail.spelling
        })
        break
      case 2: 
        this.setData({
          longTime: val,
          lid: _cid
        })
        break
      case 3: 
        this.setData({
          appendPeople: val,
          pid: _cid
        })
        break
      case 4: 
        this.setData({
          budget: val,
          bid: _cid
        })
        break
      case 5: 
        this.setData({
          activity: val,
          aid: _cid
        })
        break
      case 6: 
        this.setData({
          space: val,
          sid: _cid
        })
        break
    }
  },
  findSpace() {
    let cityid = this.data.cid, longid, budgetid, peopleid = this.data.pid, activityid = this.data.aid, spaceid = this.data.sid 
        this.data.lid ? longid = this.data.lid : longid = 0
        this.data.bid ? budgetid = this.data.lid : budgetid = 0
    
    if(this.data.cid == "" || this.data.pid == "" || this.data.aid == "" || this.data.sid == "") {
      wx.showToast({
        title: '星号必选哦',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.setStorageSync('hotelObj', {
        city: this.data.cid,
        region: 0,
        activity: activityid,
        join_members: peopleid,
        expenses: budgetid,
        tag: spaceid,
        wd: 0,
        page: 1
      })
      wx.setStorageSync('cityInfo', {
        cityName: this.data.cityName,
        cityID: this.data.sid,
        cityPy: this.data.cid,
        cityCode: this.data.cityCode
      })
      wx.reLaunch({
        url: '/pages/space/space'
      })
    }
  }
})
