// pages/reserve/reserve.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseWork: '选择行业',
    show: false,
    allPrice: 0,
    roomID: '',
    hotelID: '',
    cID: '',
    dateVal: '',
    newDate: '请选择预定时间',
    text: '',
    txtRealContent: '',
    txtContent: '',
    showMask: true,
    txtHeight: 0,
    timeIndex: 0,
    userName: '赵磊',
    phone: '18915811588',
    isShowDatetime: false,
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(),
    maxDate: new Date((new Date().getFullYear() + 2), 10, 1).getTime(),
    currentDate: new Date().getTime(),
    timeBox: [],
    arr:[],
    timeCount: 0,
    price: 1700,
    actions: [],
    workID: '',
    hotelInfo:{},
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预定信息',
    })
    console.log(options)
    let that = this
    that.setData({
      hotelID: options.hid,
      roomID: options.cid
    })
    that.getHotelReserve()
  },
  getHotelReserve() {
    let that = this
    app.util.request({
      url: '/w_reserve',
      data: {id: that.data.hotelID},
      success: function(res) {
        that.setData({
          newDate: res.date,
          actions: res.industry,
          timeBox: res.occupy,
          hotelInfo: res.room
        })
        that.getTimed()
      }
    })
  },
  getTimed() {
    let that = this
    app.util.request({
      url: '/occupancy',
      data: {room_id: that.data.roomID, date: that.data.newDate},
      success: function(res) {
        // console.log(res)
        that.setData({
        })
      }
    })
  },
  chooseTime(e) {
    let that = this
    let index = Number(e.currentTarget.dataset.index)
    if(that.data.timeBox[index].occupy == 0) {
      that.setData({
        arr: that.data.arr.concat(index)
      })
      that.data.arr.sort(function(a,b){
        return a- b;
      })
      if (app.util.isContinuationInteger(that.data.arr)) {
        that.data.timeBox[index].occupy = 1
        that.setData({
          allPrice: that.data.price*that.data.arr.length
        })
      }else{
        wx.showToast({
          title: '只能选连续的',
          icon: 'none',
          duration: 1000
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        that.removeByValue(that.data.arr, index)
      }
    }else if(that.data.timeBox[index].occupy == 1) {
      that.data.timeBox[index].occupy = 0
      that.removeByValue(that.data.arr, index)
      that.setData({
        allPrice: that.data.price * that.data.arr.length
      })
    }
    this.setData({
      timeBox: that.data.timeBox,
    });
  },
  removeByValue: function(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
  },
  openSelectBox() {
    this.setData({ show: true, showMask: false });
  },
  onClose() {
    this.setData({ show: false, showMask: true });
  },
  onSelect(e) {
    this.setData({
      workID: e.detail.id,
      chooseWork: e.detail.name
    })
  },
  chooseData() {
    this.setData({
      isShowDatetime: true,
      showMask: false
    })
  },
  onDataConfirm() {
    let that = this
    let nd = that.data.currentDate
    let newDate = app.util.date.getTimestamp(nd)
    that.setData({
      isShowDatetime: false,
      newDate: newDate,
      showMask: true
    })
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  onDataCancel() {
    this.setData({
      isShowDatetime: false,
      showMask: true
    })
    if (this.data.showMask) {
      // 将换行符转换为wxml可识别的换行元素 <br/>
      const txtRealContent = this.data.txtContent.replace(/\n/g, '<br/>')
      this.setData({ txtRealContent })
    }
  },
  textAreaLineChange(e) {
    this.setData({ txtHeight: e.detail.height })
  },
  txtInput(e) {
    this.setData({ txtContent: e.detail.value })
  },
  formName:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  formPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  bindButtonTap() {
    let that = this
    let duration = that.data.arr.join(','),
        profession = that.data.workID,
        hotel_id = that.data.hotelID,
        hotel_room_id = that.data.roomID,
        contact_user_name = that.data.userName,
        contact_mobile = that.data.phone,
        date = that.data.newDate,
        remark = that.data.txtContent
    let data = {
      hotel_id,
      hotel_room_id,
      date,
      duration,
      contact_user_name,
      contact_mobile,
      remark,
      profession
    }
    app.util.request({
      url: '/w_submitorder',
      method: 'POST',
      data: data,
      success: function(res) {
        // 支付
        // wx.navigateTo({
        //   url: '/pages/order/order',
        // })
      },
      fail: function(err) {
        console.log(err.data.msg)
        wx.showToast({
          title: err.data.msg,
          icon: 'loading',
          duration: 1000
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

  }
})