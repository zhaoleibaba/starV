const app = getApp()
Component({
  data: {
    selected: 0,
    color: "#9A9A9A",
    selectedColor: "#3D154D",
    isIphoneX: false,
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/home.png",
      selectedIconPath: "/images/home-select.png",
      text: "首页"
    }, {
      pagePath: "/pages/space/space",
      iconPath: "/images/space.png",
      selectedIconPath: "/images/space-select.png",
      text: "找会场"
    }, {
      pagePath: "/pages/user/user",
      iconPath: "/images/user.png",
      selectedIconPath: "/images/user-select.png",
      text: "个人中心"
    }],
    isShow: false
  },
  attached() {
    let isIphoneX = app.globalData.isIphoneX;
    console.log(app.globalData.isShow)
    this.setData({
      isIphoneX: isIphoneX,
      isShow: app.globalData.isShow
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})