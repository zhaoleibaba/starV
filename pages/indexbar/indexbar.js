// pages/indexbar/indexbar.js
const app = getApp()
import { cities } from "../../utils/cities"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cities: [],
    hotCites: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let storeCity = new Array(27);
    let hotCites = [];
    const words = ["热门", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item, indexs) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      if(item.hot){
        hotCites.push(item)
      }
      storeCity[index].list.push({
        name: item.name,
        key: firstName,
        id: item.zip
      });
    })

    this.data.cities = storeCity;
    this.data.hotCites = hotCites;
    this.setData({
      hotCities: this.data.hotCites,
      cities: this.data.cities
    })
  },
  cityValue(e) {
    let name = e.currentTarget.dataset.name, cityId = e.currentTarget.id
    const url = "../index/index"
    console.log(name, cityId)
    app.globalData.cityName = name
    app.globalData.cityId = cityId
    wx.switchTab({
      url: url
    })
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
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