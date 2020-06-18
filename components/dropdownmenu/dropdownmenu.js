
Component({
  properties: {
    dropDownMenuTitle: {
      type: Array,
      value: [],
    },
    dropDownMenuDistrictData: {
      type:Array,
      value:[]
    },
    dropDownMenuConditionData: {
      type:Array,
      value:[]
    },
    dropDownMenuRightData: {
      type:Array,
      value:[]
    },
  },
  data: {
    // private properity
    district_open: false, // 地理位置
    condition_open: false, // 筛选条件
    showNavIndex: '',
    unlimit: {
      id: 0,
      name: '不限'
    },
    district_left_select: '',
    district_right_select: '',
    
    dropDownMenuDistrictDataRight: {},
    overlayShow: false,
    activeIndex1: 10000,
    activeIndex2: 10000,
    activeIndex3: 10000,
    activeIndex4: 10000,
    region:0,
    activity: 0,
    join_members: 0,
    expenses: 0,
    tag: 0
  },
  methods: {
    chooseDistrictNav(e) {
      if (this.data.district_open) {
        this.setData({
          district_open: false,
          condition_open: false,
          showNavIndex: 0
        })
      } else {
        this.setData({
          district_open: true,
          condition_open: false,
          showNavIndex: e.currentTarget.dataset.index
        })
      }
    },
    chooseConditionNav(e) {
      if (this.data.condition_open) {
        this.setData({
          condition_open: false,
          district_open: false,
          showNavIndex: 0
        })
      } else {
        this.setData({
          condition_open: true,
          district_open: false,
          showNavIndex: e.currentTarget.dataset.index
        })
      }
    },
    selectDistrictLeft: function (e) {
      let that = this
      var model = e.target.dataset.model.data;
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.name;
      if (selectedId == 0) {
        that.closeHyFilter();
        that.setData({
          region: selectedId,
          district_right_select: selectedId,
          district_right_select_name: '不限位置'
        })
        that.triggerEvent("selectedItem", {
          region: selectedId,
          activity: that.data.activity,
          join_members: that.data.join_members,
          expenses: that.data.expenses,
          tag: that.data.tag
        })
      }
      that.setData({
        dropDownMenuDistrictDataRight: model == null ? "" : model,
        district_left_select: selectedId
      })
      if (model == null || model.length == 0) {
        that.closeHyFilter();
      }
    },
    selectDistrictRight: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.name;
      let that = this
      that.closeHyFilter();
      that.setData({
        region: selectedId,
        district_right_select: selectedId,
        district_right_select_name:selectedTitle
      })
      console.log(selectedId)
      that.triggerEvent("selectedItem", {
        region: selectedId,
        selectedTitle: selectedTitle,
        activity: that.data.activity,
        join_members: that.data.join_members,
        expenses: that.data.expenses,
        tag: that.data.tag
      })
    },
     /**关闭筛选 */
    closeHyFilter: function () {
      if (this.data.district_open) {
        this.setData({
          district_open: false,
          condition_open: false,
        })
      } else if (this.data.condition_open) {
        this.setData({
          condition_open: false,
          district_open: false,
        })
      }
    },
    chooseItem(e) {
      var that = this
      let tp = e.currentTarget.dataset.type, id=e.currentTarget.dataset.id
      switch(tp) {
        case '1':
          if (that.data.activeIndex1 == e.currentTarget.dataset.cid) {
            that.setData({
              activeIndex1: 10000,
              activity: 0
            })
          }else{
            console.log(e.currentTarget.dataset.id)
            that.setData({
              activeIndex1: e.currentTarget.dataset.cid,
              activity: id
            })
          }
          break;
        case '2':
          if (that.data.activeIndex2 == e.currentTarget.dataset.cid) {
            that.setData({
              activeIndex2: 10000,
              join_members: 0
            })
          }else{
            that.setData({
              activeIndex2: e.currentTarget.dataset.cid,
              join_members: id
            })
          }
          break;
        case '3':
          if (that.data.activeIndex3 == e.currentTarget.dataset.cid) {
            that.setData({
              activeIndex3: 10000,
              expenses: 0
            })
          }else{
            that.setData({
              activeIndex3: e.currentTarget.dataset.cid,
              expenses: id
            })
          }
          break;
        case '5':
          if (that.data.activeIndex3 == e.currentTarget.dataset.cid) {
            that.setData({
              activeIndex4: 10000,
              tag: 0
            })
          }else{
            that.setData({
              activeIndex4: e.currentTarget.dataset.cid,
              tag: id
            })
          }
          break;
      }
    },
    resetCondition() {
      let that = this
      that.setData({
        activeIndex1: 10000,
        activeIndex2: 10000,
        activeIndex3: 10000,
        activeIndex4: 10000,
        condition_select_name: 0,
        activity: 0,
        join_members: 0,
        expenses: 0,
        tag: 0
      })
      that.triggerEvent('conditionSelect', {
        region: that.data.region,
        activity: 0,
        join_members: 0,
        expenses: 0,
        tag: 0
      })
      this.closeHyFilter();
    },
    onConfirm() {
      let that = this
      that.triggerEvent('conditionSelect', {
        region: that.data.region,
        activity: that.data.activity,
        join_members: that.data.join_members,
        expenses: that.data.expenses,
        tag: that.data.tag
      })
      if(that.data.activeIndex1 != '' || that.data.activeIndex2 != '' || that.data.activeIndex3 != '' || that.data.activeIndex4 != ''){
        console.log(that.data.activity,that.data.join_members,that.data.expenses,that.data.tag)
        that.setData({
          condition_select_name: '分类筛选',
          activity: that.data.activity,
          join_members: that.data.join_members,
          expenses: that.data.expenses,
          tag: that.data.tag
        })
      }
      that.closeHyFilter();
    },
    dropDownMove() {
      this.closeHyFilter();
    }
  },
  //组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function () {
  },

})